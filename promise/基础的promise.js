function Promise(executor){
    const self = this;
    self.status = 'pending';//promise 状态
    self.value = undefined;// 成功有成功的值
    self.reason = undefined;// 失败有失败的原因
 
    function resolve(value){
        if(self.status === 'pending'){ //只有pending状态下才可以改变状态
            self.status = 'fulfilled';
            self.value = value;
        }
    }
    function reject(reson){
        if(self.status === 'pending'){//只有pending状态下才可以改变状态
            self.status = 'rejected';
            self.reason = reson;
        }
    }
    try{
        executor(resolve,reject); // 此处为高阶函数，一个函数内传入其他函数，这就是高阶函数的一种
    }catch(err){
        reject(err);
    }
 }
 
 Promise.prototype.then = function(onFulfilled,onRejected){
        if(this.status === 'fulfilled'){
            onFulfilled(this.value);
        }
        if(this.status === 'rejected'){
            onRejected(this.reason);
        }
 }
 
 const p = new Promise((resolve,reject)=>{
    resolve('成功') 
    // throw 1213
    // reject('失败')
});

p.then(function(data){
    console.log(data) // 成功
},function(err){
    console.log(err) // 失败 或 1213
})
