class Node {
    constructor(data = null){
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(array){
        this.array = mergeSort(removeDuplicates(array));
        this.root = this.buildTree(this.array);
    }
    buildTree(arr){
        // Base case
        if (arr.length === 1){
            return new Node(arr[0]);
        }
        let mid = Math.floor(arr.length / 2);
        let node = new Node(arr[mid]);
        let leftArray = arr.slice(0, mid);
        let rightArray = arr.slice(mid+1);
        if (leftArray.length) node.left = this.buildTree(leftArray);
        if (rightArray.length) node.right = this.buildTree(rightArray);
        return node;
    }
    insert(value, current = this.root){
        if (value < current.data){
            if (!current.left) current.left = new Node(value);
            else this.insert(value, current.left);
        } else {
            if (!current.right) current.right = new Node(value);
            else this.insert(value, current.right);
        }
    }
    delete(value, current = this.root){
        
    }
}

function removeDuplicates(arr){
    let existing = {};
    return arr.filter(item => {
        if (existing.hasOwnProperty(item)) return false
        else existing[item] = true;
        return true;
    });
}

function mergeSort(arr){
    if (arr.length <= 1) return arr;
    let mid = Math.floor(arr.length/2);
    let left = mergeSort(arr.slice(0, mid));
    let right = mergeSort(arr.slice(mid));
    let sortedArray = [];
    while (left.length > 0 || right.length > 0){
        if (left[0] < right[0] || !right[0]){
            sortedArray.push(left.splice(0,1)[0]);
        } else {
            sortedArray.push(right.splice(0,1)[0]);
        }
    }
    return sortedArray;
}

let testArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
console.log(testArray);
let tree = new Tree(testArray);
console.log(tree);

const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }
