class Node {
    constructor(data = null) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(array) {
        this.array = mergeSort(removeDuplicates(array));
        this.root = this.buildTree(this.array, 0, this.array.length - 1);
    }
    buildTree(arr, start, end) {
        // Base case
        if (start > end) return null;
        // Define the midpoint of the array & use it to create the root node
        let mid = parseInt((start + end) / 2);
        let root = new Node(arr[mid]);
        // Recursive case - building the left and right subtrees
        root.left = this.buildTree(arr, start, mid - 1);
        root.right = this.buildTree(arr, mid + 1, end);
        return root;
    }
    // Navigate through the tree to insert a value as a new Node, returning the root
    insert(value, root = this.root) {
        if (!this.root) return (this.root = new Node(value));
        if (!root) return (root = new Node(value));
        if (value < root.data) root.left = this.insert(value, root.left)
        else root.right = this.insert(value, root.right)
        return root;
    }
    // Delete Node with given value from the tree, if found, rearranging if necessary
    delete(value, root = this.root) {
        if (!root) return root;
        if (value < root.data) root.left = this.delete(value, root.left);
        else if (value > root.data) root.right = this.delete(value, root.right);
        // If we have found the Node, there are 3 scenarios:
        // If the Node is a leaf, we delete it by returning null
        // If the Node has one child, we return that child to the parent Node
        // If the Node has two children, we find the inorder successor to replace the deleted Node
        // The inorder successor will always be the smallest value (the left-most branch) of the right child
        // Once we've udpated the data property, we recursively delete the successor node to balance the tree
        else if (value === root.data) {
            if (!root.left) return root.right;
            else if (!root.right) return root.left;
            let successor = root.right;
            while (successor.left) {
                successor = successor.left;
            }
            root.data = successor.data;
            root.right = this.delete(root.data, root.right);
        }
        return root;
    }
    // Navigate through the tree and return the Node with the given value, if found
    find(value, root = this.root) {
        if (!root) return root;
        if (value === root.data) return root;
        if (value < root.data) return (this.find(value, root.left));
        else return (this.find(value, root.right));
    }
    // Runs the given function (if it exists) on each Node data within a given array of Nodes, return the array
    mapNodes(arr, fn) {
        return arr.map(node => {
            if (fn) {
                node.data = fn(node.data);
                return node.data;
            } else {
                return node.data;
            }
        });
    }
    // Traverse the tree in breadth-first level order and apply each Node to a given function
    // Return an array of values
    levelOrder(fn, root = this.root) {
        let arr = [root];
        function pushLevelOrder(index = 0) {
            if (!arr[index]) return;
            let current = arr[index];
            if (current.left) arr.push(current.left);
            if (current.right) arr.push(current.right);
            pushLevelOrder(index + 1);
        }
        pushLevelOrder();
        return this.mapNodes(arr, fn);
    }
    // Traverse the tree depth-first in inorder, preorder and postorder and apply each Node to a given function
    // Return an array of values
    inorder(fn, root = this.root) {
        let arr = [];
        function pushInorder(root) {
            if (!root) return;
            if (root.left) pushInorder(root.left);
            arr.push(root);
            if (root.right) pushInorder(root.right);
        }
        pushInorder(root);
        return this.mapNodes(arr, fn);
    }
    preorder(fn, root = this.root) {
        let arr = [];
        function pushPreorder(root) {
            if (!root) return;
            arr.push(root);
            if (root.left) pushPreorder(root.left);
            if (root.right) pushPreorder(root.right);
        }
        pushPreorder(root);
        return this.mapNodes(arr, fn);
    }
    postorder(fn, root = this.root) {
        let arr = [];
        function pushPostorder(root) {
            if (!root) return;
            if (root.left) pushPostorder(root.left);
            if (root.right) pushPostorder(root.right);
            arr.push(root);
        }
        pushPostorder(root);
        return this.mapNodes(arr, fn);
    }
    // Find the height of a given Node (number of levels of Node)
    height(root = this.root) {
        if (!root) return 0;
        return 1 + Math.max(this.height(root.left), this.height(root.right));
    }
    // Find the depth of a given node (number of paths from tree root to Node)
    depth(root = this.root, current = this.root) {
        if (!current) return -1;
        let depth = -1;
        if ((current === root) ||
            (depth = this.depth(root, current.left)) >= 0 ||
            (depth = this.depth(root, current.right)) >= 0) {
            return depth + 1
        }
        return depth;
    }
    // Check to see whether tree is balanced (no more than 1 height difference between left and right subtrees for all Nodes)
    isBalanced(root = this.root){
        if (!root) return true;
        let difference = this.height(root.left) - this.height(root.right);
        if (difference < -1 || difference > 1) return false;
        else return (this.isBalanced(root.left) && this.isBalanced(root.right));
    }
    // Rebalances the tree by building a new tree from an array of numbers taken from a traversal of the existing tree
    rebalance(root = this.root){
        let arr = this.inorder(null, root);
        arr = mergeSort(removeDuplicates(arr));
        let newRoot = this.buildTree(arr, 0, arr.length - 1);
        if (root === this.root) this.root = newRoot;
        return newRoot;
    }
}

function removeDuplicates(arr) {
    let existing = {};
    return arr.filter(item => {
        if (existing.hasOwnProperty(item)) return false
        else existing[item] = true;
        return true;
    });
}

function mergeSort(arr) {
    if (arr.length <= 1) return arr;
    let mid = Math.floor(arr.length / 2);
    let left = mergeSort(arr.slice(0, mid));
    let right = mergeSort(arr.slice(mid));
    let sortedArray = [];
    while (left.length > 0 || right.length > 0) {
        if (left[0] < right[0] || right.length === 0) {
            sortedArray.push(left.splice(0, 1)[0]);
        } else {
            sortedArray.push(right.splice(0, 1)[0]);
        }
    }
    return sortedArray;
}

// let testArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
// console.log(testArray);
// let tree = new Tree(testArray);
// console.log(tree);

const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (!node) return "Given root does not exist";
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
}

// prettyPrint(tree.root)

function randomNumberArray(n = 20, max = 100){
    let arr = [];
    for (let i = 0; i < n; i++){
        arr.push(Math.floor(Math.random()*max));
    }
    return arr;
}

let newArray = randomNumberArray(20, 100);
console.log(newArray)
let newTree = new Tree(newArray);

console.log(newTree)
prettyPrint(newTree.root)
console.log(`isBalanced: ${newTree.isBalanced()}`)
console.log(`level: ${newTree.levelOrder()}`)
console.log(`pre: ${newTree.preorder()}`)
console.log(`post: ${newTree.postorder()}`)
console.log(`in: ${newTree.inorder()}`)
console.log("inserting 88, 89, 96, 68, 78, 99, 75, 74")
newTree.insert(88)
newTree.insert(89)
newTree.insert(96)
newTree.insert(68)
newTree.insert(78)
newTree.insert(99)
newTree.insert(75)
newTree.insert(74)
prettyPrint(newTree.root)
console.log(`isBalanced: ${newTree.isBalanced()}`)
console.log("rebalancing...")
newTree.rebalance()
prettyPrint(newTree.root)
console.log(`isBalanced: ${newTree.isBalanced()}`)
console.log(`level: ${newTree.levelOrder()}`)
console.log(`pre: ${newTree.preorder()}`)
console.log(`post: ${newTree.postorder()}`)
console.log(`in: ${newTree.inorder()}`)