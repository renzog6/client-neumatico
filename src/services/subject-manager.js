import { Subject } from 'rxjs'

export class SubjectManager {
  subject$ = new Subject()

  getSubject() {
    return this.subject$.asObservable()
  }

  setSubject(value) {
    this.subject$.next(value)
  }

  neumatico$ = new Subject()

  getNeumatico() {
    return this.neumatico$.asObservable()
  }

  setNeumatico(value) {
    this.neumatico$.next(value)
  }
}
