

```js
function Promise(executor) {
    var self = this;
    self.status = 'pending'
    self.data = undefined
    self.onResolvedCallback = []
    self.onRejectedCallback = []

    function resolve(value) {

    }

    function reject(reason) {

    }

    try {
        executor(resolve, reject)
    } catch(e) {
        reject(e)
    }

    executor(resolve, reject)
}
```