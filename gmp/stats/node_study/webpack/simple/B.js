import A from './A'
import {method2} from "./lib"

export default class B {
    name = "B"

    toString() {
        return method2() + "B";
    }
}