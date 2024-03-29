let checkBinaryTreeOrderInvariant = function (node) {
    if (node != null) {
        if (node.left != null) {
            chai.assert(node.key > node.left.key);
            checkBinaryTreeOrderInvariant(node.left);
        }
        if (node.right != null) {
            chai.assert(node.key < node.right.key);
            checkBinaryTreeOrderInvariant(node.right);
        }
    }
};

let checkRedBlackTreeInvariant = function (node) {
    console.log(node);
    if (node != null) {
        if (node.parent === null) {
            console.log(node.color);
            console.log(Color.black);
            chai.expect(node.color).to.equal(Color.black);
        } else {
            if (node.color === Color.red) {
                if (node.left != null) {
                    chai.expect(node.left.color).to.equal(Color.black);
                }
                if (node.right != null) {
                    chai.expect(node.right.color).to.equal(Color.black);
                }
            }
        }
    }
};

describe('Linked List Node', () => {
    let node = new ListNode(3, null, null);

    it('node should not be empty', () => {
        chai.expect(node.key).to.equal(3);
        chai.expect(node.next).to.equal(null);
    });

    it('next getter & setter', () => {
        node.next = new ListNode(2, null, null);
        chai.expect(node.key).to.equal(3);
        chai.expect(node.next).to.not.equal(null);
        chai.expect(node.next.key).to.equal(2);
    });

});

describe('Linked List', () => {
    it('root should be empty', () => {
        let list = new List();
        chai.expect(list.root).to.equal(null);
    });

    it('insertion ', () => {
        let list = new List();
        chai.expect(list.root).to.equal(null);
        chai.expect(list.searchKey(3)).to.equal(null);
        list.insertKey_begin(3, null);
        chai.expect(list.root).to.not.equal(null);
        chai.expect(list.root.key).to.equal(3);
        chai.expect(list.searchKey(3)).to.equal(list.root);


        chai.expect(list.searchKey(5)).to.equal(null);
        list.insertKey_end(5, null);
        chai.expect(list.root.next).to.not.equal(null);
        chai.expect(list.root.next.key).to.equal(5);
        chai.expect(list.searchKey(5)).to.equal(list.root.next);


        chai.expect(list.searchKey(2)).to.equal(null);
        list.insertKey_begin(2, null);
        chai.expect(list.root).to.not.equal(null);
        chai.expect(list.root.key).to.equal(2);
        chai.expect(list.searchKey(2)).to.equal(list.root);

        chai.expect(list.searchKey(1)).to.equal(null);
        list.insertKey_afterKey(1, null, 3);
        chai.expect(list.searchKey(3).next.key).to.equal(1);
    });

    it('deletion', () => {
        let list = new List();
        list.insertKey_begin(3, null);
        list.insertKey_end(5, null);
        list.insertKey_begin(2, null);
        list.insertKey_afterKey(1, null, 3);

        chai.expect(list.searchKey(1)).to.not.equal(null);
        list.deleteKey(1);
        chai.expect(list.searchKey(1)).to.equal(null);

        chai.expect(list.searchKey(2)).to.not.equal(null);
        list.deleteKey(2);
        chai.expect(list.searchKey(2)).to.equal(null);
        chai.expect(list._root).to.not.equal(null);

        chai.expect(list.searchKey(5)).to.not.equal(null);
        list.deleteKey(5);
        chai.expect(list.searchKey(5)).to.equal(null);

        chai.expect(list.searchKey(3)).to.not.equal(null);
        list.deleteKey(3);
        chai.expect(list.searchKey(3)).to.equal(null);
        chai.expect(list._root).to.equal(null);
    });


});

describe('Linked List Iterator', () => {

    let list = new List();
    list.insertKey_begin(3, null);
    list.insertKey_end(5, null);
    list.insertKey_begin(2, null);
    list.insertKey_afterKey(1, null, 3);
    it('Iterator', () => {
        let li = new ListIterator(list);
        chai.expect(li.end()).to.equal(false);
        chai.expect(li.current.key).to.equal(2);
        li.next();
        chai.expect(li.current.key).to.equal(3);
        li.next();
        chai.expect(li.current.key).to.equal(1);
        li.next();
        chai.expect(li.current.key).to.equal(5);
        li.next();
        chai.expect(li.current).to.equal(null);
        chai.expect(li.end()).to.equal(true);
    });
    it('make array', () => {
        let arr = getListArray(list);
        chai.expect(arr[0]).to.equal(2);
        chai.expect(arr[1]).to.equal(3);
        chai.expect(arr[2]).to.equal(1);
        chai.expect(arr[3]).to.equal(5);
    });
});

describe('RedBlackTree Tree Node', () => {
    var node = new RedBlackNode(3, null);

    it('node should not be empty', () => {
        chai.expect(node.key).to.equal(3);
        chai.expect(node.left).to.equal(null);
        chai.expect(node.right).to.equal(null);
        chai.expect(node.color).to.equal(Color.red);
    });

    it('left getter & setter', () => {
        node.left = new RedBlackNode(2, node);
        chai.expect(node.key).to.equal(3);
        chai.expect(node.left).to.not.equal(null);
        chai.expect(node.left.key).to.equal(2);
    });

    it('right getter & setter', () => {
        node.right = new RedBlackNode(5, node);
        chai.expect(node.key).to.equal(3);
        chai.expect(node.right).to.not.equal(null);
        chai.expect(node.right.key).to.equal(5);
    });

    it('grandparent and uncle getters should work correct', () => {
        node.left = new RedBlackNode(2, node);
        node.left.left = new RedBlackNode(1, node.left);
        node.right = new RedBlackNode(5, node);
        node.right.right = new RedBlackNode(6, node.right);

        var leftGranson = node.left.left;
        var rightGrandson = node.right.right;
        chai.expect(leftGranson.grandparent).to.equal(node);
        chai.expect(leftGranson.uncle).to.equal(node.right);
        chai.expect(rightGrandson.grandparent).to.equal(node);
        chai.expect(rightGrandson.uncle).to.equal(node.left);
    });
});

describe('RedBlackTree Tree', () => {
    it('root should be empty', () => {
        var tree = new RedBlackTree();

        chai.expect(tree.root).to.equal(null);
    });

    describe('Red Black Tree insertion', () => {
        var tree = new RedBlackTree();

        it('Red Black Tree invariants', () => {
            tree.insertKey(3);
            checkBinaryTreeOrderInvariant(tree.root);
            checkRedBlackTreeInvariant(tree.root);
            tree.insertKey(5);
            checkBinaryTreeOrderInvariant(tree.root);
            checkRedBlackTreeInvariant(tree.root);
            tree.insertKey(2);
            checkBinaryTreeOrderInvariant(tree.root);
            checkRedBlackTreeInvariant(tree.root);
            tree.insertKey(1);
            checkBinaryTreeOrderInvariant(tree.root);
            checkRedBlackTreeInvariant(tree.root);
        });
    });

    describe('Red Black Tree search', () => {
        var tree = new RedBlackTree();

        before(() => {
            tree.insertKey(3);
            tree.insertKey(5);
            tree.insertKey(2);
            tree.insertKey(1);
        });
        it("search should return node with searched key", () => {
            chai.expect(tree.searchKey(3).key).to.equal(3);
            chai.expect(tree.searchKey(5).key).to.equal(5);
            chai.expect(tree.searchKey(2).key).to.equal(2);
            chai.expect(tree.searchKey(1).key).to.equal(1);
            chai.expect(tree.searchKey(7)).to.equal(null);
        });
    });
});