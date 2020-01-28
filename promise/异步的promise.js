function Promise(executor){
    const self = this;
    self.status = 'pending';//promise 状态
    self.value = undefined;// 成功有成功的值
    self.reason = undefined;// 失败有失败的原因
    self.onResolvedCallbacks = [];
    self.onRejectedCallbacks = [];
 
    function resolve(value){
        if(self.status === 'pending'){ //只有pending状态下才可以改变状态
            self.status = 'fulfilled';
            self.value = value;
            self.onResolvedCallbacks.forEach(item => item(value));
        }
    }
    function reject(reson){
        if(self.status === 'pending'){//只有pending状态下才可以改变状态
            self.status = 'rejected';
            self.reason = reson;
            self.onRejectedCallbacks.forEach(item => item(value));
        }
    }
    try{
        executor(resolve,reject); // 此处为高阶函数，一个函数内传入其他函数，这就是高阶函数的一种
    }catch(err){
        reject(err);
    }
 }
 
 Promise.prototype.then = function(onFulfilled,onRejected){
        const self = this;
        if(self.status === 'fulfilled'){
            onFulfilled(this.value);
        }
        if(self.status === 'rejected'){
            onRejected(this.reason);
        }
        if (self.status == 'pending') {
            self.onResolvedCallbacks.push(function (value) {
                try {
                    onFulfilled(value);
                } catch (e) {
                    reject(e);
                }
            });
            self.onRejectedCallbacks.push(function (value) {
                try {
                    onRejected(value);
                } catch (e) {
                    reject(e);
                }
            });
        }
 }

// const p = new Promise((resolve,reject)=>{
//     resolve('成功') 
//     // throw 1213
//     // reject('失败')
// });
 
const p = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve('我是异步的成功')
    })      
});

p.then(function(data){
    console.log(data) // 成功
},function(err){
    console.log(err) // 失败 或 1213
})
