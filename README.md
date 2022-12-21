# Binary Search Trees
A Binary Tree class created with JavaScript.

Part of The Odin Project's [curriculum](https://www.theodinproject.com/lessons/javascript-binary-search-trees).

Created by Carl Madsen, 2022.

## Functionality

* **insert(value)** - Inserts a node with the given value into the tree in the correct location
* **delete(value)** - Deletes a node with the given value from the tree and keeps the tree sorted. Returns the deleted node
* **find(value)** - Returns the node with the given value
* **levelOrder(fn, node)** - Traverses the tree (or given node) in level order and provides each node value as an argument to the given function. Returns an array of all the node values - post function if given
* **inorder(fn, node)** -  - Traverses the tree (or given node) in inorder and provides each node value as an argument to the given function. Returns an array of all the node values - post function if given
* **preorder(fn, node)** -  - Traverses the tree (or given node) in preorder and provides each node value as an argument to the given function. Returns an array of all the node values - post function if given
* **postorder(fn, node)** -  - Traverses the tree (or given node) in postorder and provides each node value as an argument to the given function. Returns an array of all the node values - post function if given
* **height(node)** - Returns the height of a given node
* **depth(node)** - Returns the depth of a given node in the tree
* **isBalanced()** - Checks whether or not the tree is balanced
* **rebalance()** - Rebalances the tree

## Learning outcomes & challenges

* This was the first time I've come across a **binary tree**, and the setting up of the tree was relatively simple. I didn't have any trouble inserting a node, but the complexity came hard and first with deleting a node - specifically one that had two children. After some research and learning that the node should be replaced by the inorder successor (the left-most node of the right child), I was able to figure out how the replacing should work.
* This was my first experience with **breadth-first and depth-first traversal**, which was fantastic to learn. The concepts of how each uses stacks or queues and how it all works was easy for me to understand, but it took a bit of fiddling to figure out how to represent it in code.