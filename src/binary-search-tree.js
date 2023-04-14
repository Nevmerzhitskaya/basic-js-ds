const { NotImplementedError } = require('../extensions/index.js');

// const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/

class Node {
  constructor(data) {
    this.data = data;
    this.leftChild = null;
    this.rightChild = null;

  }
}
class BinarySearchTree {
  constructor() {
    this.tree = null;
  }

  root() {
    return this.tree;
  }

  add(data) {
    this.tree = this._addChild(this.tree, data);
  }

  has(data) {
    return this._hasData(this.tree, data);
  }

  find(data) {
    return this._findNode(this.tree, data);
  }

  remove(data) {
    this.tree = this._removeNode(this.tree, data);
  }

  min() {
    return this.tree ? this._minValue(this.tree).data : null;
  }

  max() {
    return this.tree ? this._maxValue(this.tree).data : null;
  }

  _addChild(node, value) {
    if (!node) {
      return new Node(value);
    }

    if (node.data === value) {
      return node;
    }

    if (node.data > value) {
      node.leftChild = this._addChild(node.leftChild, value);
    } else {
      node.rightChild = this._addChild(node.rightChild, value);
    }

    return node;
  }

  _hasData(node, value) {
    if (!node) {
      return false;
    }

    if (node.data === value) {
      return true;
    }

    if (node.data > value) {
      return this._hasData(node.leftChild, value);
    } else {
      return this._hasData(node.rightChild, value);
    }
  }

  _findNode(node, value) {
    if (!node) {
      return null;
    }

    if (node.data === value) {
      return node;
    }

    if (node.data > value) {
      return this._findNode(node.leftChild, value);
    } else {
      return this._findNode(node.rightChild, value);
    }
  }

  _removeNode(node, value) {
    if (!node) {
      return null;
    }

    if (node.data > value) {
      node.leftChild = this._removeNode(node.leftChild, value);

      return node;
    } else if (node.data < value) {
      node.rightChild = this._removeNode(node.rightChild, value);
      
      return node;
    }

    if (!node.leftChild && !node.rightChild) {
      return null;
    }
    
    if(!node.rightChild) {
      node = node.leftChild;
      return node;
    }

    if(!node.leftChild) {
      node = node.rightChild;
      return node;
    }

    const minRightNode = this._minValue(node.rightChild);
    node.data = minRightNode.data;
    node.rightChild = this._removeNode(node.rightChild, minRightNode.data);

    return node;
  }

  _minValue(node) {
    return node.leftChild ? this._minValue(node.leftChild) : node;
  }

  _maxValue(node) {
    return node.rightChild ? this._maxValue(node.rightChild) : node;
  }

}

module.exports = {
  BinarySearchTree
};