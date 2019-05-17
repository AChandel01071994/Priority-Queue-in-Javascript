//  using Min Binary Heap (Priority - 1 is top priority) (supports duplicate priorities,FCFS)
// enQueue & deQueue in O(log n) time
{
class Node {
    constructor(val, priority){
        this.val = val;
        this.priority = priority;
        this.timeStamp = new Date().getTime();
    }
}

class PriorityQueue {
    constructor(){
        this.values = [];
    }
    enQueue(val, priority){
        if(!val || !priority || isNaN(priority)) return null;
        let node = new Node(val, priority);
        // push new node
        this.values.push(node);
        // bubbleUp
        this.bubbleUp();
        return this.values;
    }
    // extract/remove root node (with max priority)
    deQueue(){
        const min = this.values[0];
        const last = this.values.pop();
        if(this.values.length > 0){
             this.values[0] = last;
             this.bubbleDown();
        }
        return min;
    }
    // private helper functions below
    bubbleDown(){
       let idx = 0;
       let current = this.values[idx];
       while(true){
           let swapIdx = null;
           let leftIdx = this.getLeftChildIdx(idx);
           let rightIdx = this.getRightChildIdx(idx);
           let left = this.values[leftIdx];
           let right = this.values[rightIdx];
           // if left index is under the length
            if(leftIdx < this.values.length){
                // if - left priority is smaller
                // or if - priorities ar same but left timestamp is smaller than current's timeStamp
                if(
                (left.priority < current.priority) ||
                (left.priority === current.priority && left.timeStamp < current.timeStamp)
                ){
                   swapIdx = leftIdx;
                 }
            }
            // if right index is under the length
            if(rightIdx < this.values.length){
                // if right has smallest priority/timestamp among left,right,current
                // or if right has smallest priority/timestamp among right,current
                if(
                    ((swapIdx !== null && (right.priority < left.priority)) || (swapIdx !== null && right.priority === left.priority && right.timeStamp < left.timeStamp)) ||
                    ((swapIdx === null && right.priority < current.priority) || (swapIdx === null && right.priority === current.priority && right.timeStamp < current.timeStamp))
                   ){
                       swapIdx = rightIdx;
                   }
            }
            // if no swap, break
           if(swapIdx === null) break;
           // else swap
           this.values[idx] = this.values[swapIdx];
           this.values[swapIdx] = current;
           idx = swapIdx;
       }
    }
    bubbleUp(){
        let idx = this.values.length - 1;
        let current =  this.values[idx];
        
        while(idx > 0){
            let parentIdx = this.getParentIdx(idx);
            let parent = this.values[parentIdx];

            // break if
            // priorities are diff and current priority is bigger
            // priorities are same and current timstamp is same or greater
            if(
            (current.priority > parent.priority) || 
            (current.priority === parent.priority && current.timeStamp >= parent.timeStamp)
            ) break;

            this.values[idx] = parent;
            this.values[parentIdx] = current;
            idx = parentIdx;
        }
    }
    getParentIdx(idx){
        return Math.floor((idx - 1) / 2);
    }
    getLeftChildIdx(idx){
        return 2 * idx + 1;
    }
    getRightChildIdx(idx){
        return 2 * idx + 2;
    }
}

let pq = new PriorityQueue();
// pq.enQueue('p - 3', 3);
// pq.enQueue('p - 2', 2);
// pq.enQueue('p - 1', 1);
// pq.enQueue('p - 4', 4);
// pq.enQueue('p - 1', 1);
// pq.deQueue();
// console.log(pq.values);
// pq.deQueue();
// console.log(pq.values);
setTimeout(() => pq.enQueue('p 1',1),500);
setTimeout(() => pq.enQueue('p 3',3),1000)
setTimeout(() => pq.enQueue('p 1 ',1),1500)
setTimeout(() => pq.enQueue('p 3',3),2000)
setTimeout(() => pq.enQueue('p 3',3),2000)
setTimeout(() => pq.enQueue('p 1 ',1),2500)
setTimeout(() => pq.enQueue('p 1 ',1),2500)
setTimeout(() => {
    pq.deQueue();
    console.log(pq.values);
},2500)
}
