class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    constructor(array) {
        this.root = this.buildTree(this.sortAndRemoveDuplicates(array));
    }

    sortAndRemoveDuplicates(array) {
        let uniqueArray = [...new Set(array)];
        uniqueArray.sort((a, b) => a - b);
        return uniqueArray;
    }

    buildTree(array, left = 0, right = array.length - 1) {
        if (left > right) return null;

        let mid = Math.floor((left + right) / 2);

        const node = new Node(array[mid]);

        node.left = this.buildTree(array, left, mid - 1);
        node.right = this.buildTree(array, mid + 1, right);

        return node;
    }

    insert(value) {
        if (!this.root) {
            this.root = new Node(value);
            return;
        }

        let temp = this.root;

        while (true) {
            if (value > temp.value) {
                if (!temp.right) {
                    temp.right = new Node(value);
                    return;
                }
                temp = temp.right;
            } else if (value < temp.value) {
                if (!temp.left) {
                    temp.left = new Node(value);
                    return;
                }
                temp = temp.left;
            } else return;
        }
    }

    insertRecursive(value, node = this.root) {
        if (!this.root) {
            this.root = new Node(value);
            return this.root;
        }

        if (!node) return new Node(value);

        if (value > node.value) {
            node.right = this.insertRecursive(value, node.right);
        } else if (value < node.value) {
            node.left = this.insertRecursive(value, node.left);
        }

        return node;
    }

    delete(value) {
        let parent = null;
        let current = this.root;

        while (current && current.value !== value) {
            if (value > current.value) {
                parent = current;
                current = current.right;
            } else if (value < current.value) {
                parent = current;
                current = current.left;
            }
        }

        if (!current) return;

        if (!current.left || !current.right) {
            const child = current.left ? current.left : current.right;

            if (this.root === current) {
                this.root = child;
            } else if (parent.left === current) {
                parent.left = child;
            } else {
                parent.right = child;
            }
        } else {
            let successorParent = current;
            let successor = current.right;

            while (successor.left) {
                successorParent = successor;
                successor = successor.left;
            }

            current.value = successor.value;

            if (successorParent.left === successor) {
                successorParent.left = successor.right;
            } else {
                successorParent.right = successor.right;
            }
        }
    }

    deleteRecursive(value, node = this.root) {
        if (!node) return null;

        if (node.value > value) {
            node.left = this.deleteRecursive(value, node.left);
        } else if (node.value < value) {
            node.right = this.deleteRecursive(value, node.right);
        } else {
            if (!node.left) {
                if (node === this.root) {
                    this.root = node.right;
                }
                return node.right;
            }
            if (!node.right) {
                if (node === this.root) {
                    this.root = node.left;
                }
                return node.left;
            }

            let successorParent = node;
            let successor = node.right;

            while (successor.left) {
                successorParent = successor;
                successor = successor.left;
            }

            node.value = successor.value;

            if (successorParent.left === successor) {
                successorParent.left = successor.right;
            } else {
                successorParent.right = successor.right;
            }
            return node;
        }
    }

    find(value) {
        let temp = this.root;

        while (temp) {
            if (value === temp.value) {
                return temp;
            } else if (value < temp.value) {
                temp = temp.left;
            } else {
                temp = temp.right;
            }
        }

        return null;
    }

    findRecursive(value, node = this.root) {
        if (!node) return null;

        if (value === node.value) {
            return node;
        }

        if (value < node.value) {
            return this.findRecursive(value, node.left);
        } else {
            return this.findRecursive(value, node.right);
        }
    }

    levelOrder(callback) {
        if (!this.root) return;
        if (!callback) throw new Error("Callback function is required");

        const queue = [this.root];

        while (queue.length > 0) {
            const node = queue.shift();

            if (node.left) {
                queue.push(node.left);
            }
            if (node.right) {
                queue.push(node.right);
            }

            callback(node);
        }
    }

    inOrder(callback, node = this.root) {
        if (!node) return;
        if (!callback) throw new Error("Callback function is required");

        this.inOrder(callback, node.left);
        callback(node);
        this.inOrder(callback, node.right);
    }

    preOrder(callback, node = this.root) {
        if (!node) return;
        if (!callback) throw new Error("Callback function is required");

        callback(node);
        this.preOrder(callback, node.left);
        this.preOrder(callback, node.right);
    }

    postOrder(callback, node = this.root) {
        if (!node) return;
        if (!callback) throw new Error("Callback function is required");

        this.postOrder(callback, node.left);
        this.postOrder(callback, node.right);
        callback(node);
    }

    height(node = this.root) {
        if (!node) return -1;

        const leftSubTreeHeight = this.height(node.left);
        const rightSubTreeHeight = this.height(node.right);

        return Math.max(leftSubTreeHeight, rightSubTreeHeight) + 1;
    }

    depth(node) {
        let temp = this.root;
        let depth = 0;

        while (temp) {
            if (node.value === temp.value) {
                return depth;
            } else if (node.value < temp.value) {
                temp = temp.left;
            } else {
                temp = temp.right;
            }
            depth++;
        }

        return -1;
    }

    isBalanced(node = this.root) {
        const NOT_BALANCED = -2;

        const isBalancedHelper = (node = this.root) => {
            if (!node) return -1;

            const leftSubTreeHeight = isBalancedHelper(node.left);
            if (leftSubTreeHeight === NOT_BALANCED) return NOT_BALANCED;

            const rightSubTreeHeight = isBalancedHelper(node.right);
            if (rightSubTreeHeight === NOT_BALANCED) return NOT_BALANCED;

            if (Math.abs(leftSubTreeHeight - rightSubTreeHeight) > 1)
                return NOT_BALANCED;

            return Math.max(leftSubTreeHeight, rightSubTreeHeight) + 1;
        };

        return isBalancedHelper(node) !== NOT_BALANCED;
    }

    rebalance() {
        const newTree = [];
        this.inOrder((node) => newTree.push(node.value));

        this.root = this.buildTree(newTree);
    }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
        return;
    }
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};
