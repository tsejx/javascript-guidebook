// 被观察者
class Subject {
  constructor(name) {
    this.state = 'Happy'
    this.observer = []
  }
  // 注册观察者到被观察者上
  attach (observer) {
    this.observer.push(observer)
  }
  setState (nextState) {
    this.state = nextState
    this.observer.forEach(o => o.update(nextState))
  }
}

// 观察者
class Observer {
  constructor(name) {
    this.naem = name
  }
  update (nextState) {
    console.log('通知：被观察已更新')
  }
}
