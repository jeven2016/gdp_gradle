function Person(name) {
    this.name = name;
    this.show = function () {
        return this.name;
    }

}

/*注意，模块接口的唯一变化是使用
 module.exports = Person 代替了 exports.Person= Person。
 在外部引用该模块时，其接口对象就是要输出的 Person 对象本身，
 而不是原先的 exports。*/
module.exports = Person;