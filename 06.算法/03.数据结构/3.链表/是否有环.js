// 快慢指针
var linkList = {
    val: 1, 
    next: {
        val: 2, 
        next: {
            val: 3, 
            next: {
                val: 1, 
                next: linkList
            }
        }
    }
}

function isLoop(head) {
    let fast = head;
    let slow = head;
    while(fast && fast.next) {
        fast = fast.next.next;
        slow = slow.next;
        if(fast == slow) return true
    }
    return false
}

console.log(1111, isLoop(linkList))