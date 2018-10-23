import {method1} from './lib'

export default class A{
    name= "A"

    toString(){
        return method1()+"A";
    }
}