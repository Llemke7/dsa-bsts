class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */
  insert(val) {
    const newNode = new Node(val);
    if (this.root === null) {
      this.root = newNode;
      return this;
    }

    let current = this.root;
    while (true) {
      if (val < current.val) {
        if (current.left === null) {
          current.left = newNode;
          return this;
        }
        current = current.left;
      } else {
        if (current.right === null) {
          current.right = newNode;
          return this;
        }
        current = current.right;
      }
    }
  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */
  insertRecursively(val, node = this.root) {
    if (this.root === null) {
      this.root = new Node(val);
      return this;
    }

    if (val < node.val) {
      if (node.left === null) {
        node.left = new Node(val);
        return this;
      } else {
        return this.insertRecursively(val, node.left);
      }
    } else {
      if (node.right === null) {
        node.right = new Node(val);
        return this;
      } else {
        return this.insertRecursively(val, node.right);
      }
    }
  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */
  find(val) {
    let current = this.root;
    while (current) {
      if (val === current.val) return current;
      if (val < current.val) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return undefined;
  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */
  findRecursively(val, node = this.root) {
    if (node === null) return undefined;
    if (val === node.val) return node;
    if (val < node.val) {
      return this.findRecursively(val, node.left);
    } else {
      return this.findRecursively(val, node.right);
    }
  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */
  dfsPreOrder() {
    const result = [];
    function traverse(node) {
      if (node === null) return;
      result.push(node.val);
      traverse(node.left);
      traverse(node.right);
    }
    traverse(this.root);
    return result;
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */
  dfsInOrder() {
    const result = [];
    function traverse(node) {
      if (node === null) return;
      traverse(node.left);
      result.push(node.val);
      traverse(node.right);
    }
    traverse(this.root);
    return result;
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */
  dfsPostOrder() {
    const result = [];
    function traverse(node) {
      if (node === null) return;
      traverse(node.left);
      traverse(node.right);
      result.push(node.val);
    }
    traverse(this.root);
    return result;
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */
  bfs() {
    const result = [];
    const queue = [];
    if (this.root !== null) queue.push(this.root);
    
    while (queue.length) {
      const node = queue.shift();
      result.push(node.val);
      if (node.left !== null) queue.push(node.left);
      if (node.right !== null) queue.push(node.right);
    }
    return result;
  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */
  remove(val) {
    this.root = this._removeNode(this.root, val);
  }

  _removeNode(node, val) {
    if (node === null) return null;

    if (val < node.val) {
      node.left = this._removeNode(node.left, val);
      return node;
    } else if (val > node.val) {
      node.right = this._removeNode(node.right, val);
      return node;
    } else {
      // Node with no children
      if (node.left === null && node.right === null) return null;
      // Node with one child
      if (node.left === null) return node.right;
      if (node.right === null) return node.left;
      // Node with two children
      let minLargerNode = this._findMin(node.right);
      node.val = minLargerNode.val;
      node.right = this._removeNode(node.right, minLargerNode.val);
      return node;
    }
  }

  _findMin(node) {
    while (node.left !== null) {
      node = node.left;
    }
    return node;
  }

  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */
  isBalanced() {
    const checkHeight = (node) => {
      if (node === null) return 0;
      const leftHeight = checkHeight(node.left);
      const rightHeight = checkHeight(node.right);
      if (leftHeight === -1 || rightHeight === -1 || Math.abs(leftHeight - rightHeight) > 1) {
        return -1;
      }
      return Math.max(leftHeight, rightHeight) + 1;
    };
    return checkHeight(this.root) !== -1;
  }

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */
  findSecondHighest() {
    if (this.root === null || (this.root.left === null && this.root.right === null)) return undefined;

    let current = this.root;
    let parent = null;
    while (current.right !== null) {
      parent = current;
      current = current.right;
    }

    if (current.left !== null) {
      return this._findMax(current.left).val;
    }

    return parent.val;
  }

  _findMax(node) {
    while (node.right !== null) {
      node = node.right;
    }
    return node;
  }
}

module.exports = BinarySearchTree;
