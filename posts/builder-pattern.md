---
title: Builder Pattern - implementando com TS!
publish_date: 2022-07-31
snippet: Nesse post vamos conhecer mais sobre o pattern e fazer uma implementação utilizando Typescript.
---

Olá!

Já se deparou com uma classe que precisa de vários argumentos e é super difícil de instanciar?
É muito comum nesses casos usar um **builder** para auxiliar na criação dessa classe, inclusive
pode ser extremamente útil quando você não tem todos os dados necessário logo de cara.

```typescript
class Person {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly age: number
  ) {}
}
```

Ok, nesse exemplo a classe Person tem apenas dois argumentos, mas imagine que ela poderia ter mais uns 5, faça esse exercício na sua IDE. Fica complexa de criar né? E como eu disse anteriormente, às vezes acontece de você ter que fazer uma ação para recuperar um dado que ainda não tem, mas precisa na criação dessa classe,
a gente muitas vezes poderia resolver esse problema com um **set**, mas em alguns casos, por exemplo, a classe tem um validador executado na instanciação, ou alguma outra ação assim que é criada e ela precisa de todos os dados com ela desde o início, nesse caso, o builder é uma boa saída.

Vamos agora implementar um Builder para essa classe.

```typescript
class PersonBuilder {
  private _id: string = UUID.generate();
  private _name: string;
  private _age: number;

  static fresh(): PersonBuilder {
    return new PersonBuilder();
  }

  static from(person: Person) {
    const builder = new PersonBuilder();

    for (const [key, value] of Object.entries(person)) {
      this[`_${key}`] = value;
    }

    return builder;
  }

  build(): Person {
    return new Person({
      id: this._id
      name: this._name,
      age: this._age,
    });
  }

  id(id: string): this {
    this._id = id;
    return this;
  }

  name(name: string): this {
    this._name = name;
    return this;
  }

  age(age: number): this {
    this._age = age;
    return this;
  }
}
```

Pronto, agora temos nosso builder pronto para uso, e veja como fica simples de utilizar:

```typescript
const user = UserBuilder.fresh().name("John Doe").age(30).build();
```

Pode ser que por ser uma classe muito simples aqui, não aparenta tanto o benefício, mas novamente, faça o exercício, aumentando as propriedades dessa classe, e fazendo uma consulta antes para recuperar algum dado de realizar o build dela.
Outra coisa boa é que o builder poderia conter valores padrões para o caso de quando o valor da propriedade não é fornecido, ele usa o valor padrão de criação, você deve ter reparado que não coloquei um id porquê estou criando uma nova person então quis que o próprio builder fizesse isso por mim.

Duas considerações:

- Você reparou que eu defini a minha classe Person com todos os campos readonly, isso significa que
  sempre que criarmos um usuário novo, ele é imutável, e isso é ótimo para consistência!

- Você percebeu como é muito mais interativo a criação utilizando um builder?

E você deve estar pensando, para que o builder tem um método `from` que recebe um usuário... Bom, isso eu fiz para facilitar algumas coisas.

Imagine você que tem um useCase que serve para alterar algum campo, vamos imaginar a atualização do nome, bom na requisição você deve receber o id desse usuário e o nome atualizado, e você vai fazer primeiro uma busca no banco e verificar se esse retorno é válido certo?

Pois bem, com um retorno válido, você recebeu do banco a pessoa referente a esse id, e tudo que você precisa fazer é alterar o nome dela, veja como é simples:

```typescript
export class UpdatePersonUseCase {
  constructor(private userRepository) {}

  async execute(id: string, name: string) {
    const result = await this.personRepository.find(id);

    if (!result) throw new Error("Person not found");

    const person = PersonBuilder.from(result).name(name).build();

    await this.personRepository.update(person);
  }
}
```

Simples não? Existem N formas de implementar um builder, essa é uma, e não quer dizer que seja a melhor, existe também uma maneira de você definir a ordem que você quer executar os steps do builder, por exemplo, por alguma razão a propriedade x deve ser executada antes da y, com isso você consegue realizar esse "bloqueio", aumenta um pouco a complexidade da criação do builder? Sim, mas pode ser uma alternativa necessária para alguns casos. No próximo post falarei um pouco de como fazer isso!

Até 😃
