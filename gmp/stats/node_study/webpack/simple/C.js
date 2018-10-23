import A from './A'
import B from './B'


export default class C {
    toString() {
        return new A().toString() + '-' + new B().toString();
    }
}