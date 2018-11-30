// 快速排序的思想：
// 在数组中找到一个基准数（ pivot）
// 分区， 将数组中比基准数大的放到它的右边， 比基准数小的放到它的左边
// 继续对左右区间重复第二步， 直到各个区间只有一个数， 这时候， 数组也就有序了
// 最差时间复杂度： 每次选取的基准元素都为最大（ 或最小元素） 导致每次只划分了一个分区， 需要进行n - 1 次划分才能结束递归， 故复杂度为O(n ^ 2)
// 最优时间复杂度： 每次选取的基准元素都是中位数， 于是每次都划分出两个分区， 需要进行logn次递归， 故时间复杂度为O(nlogn)
// 平均时间复杂度： O(nlogn)。 稳定性： 不稳定的。 辅助空间： O(nlogn)
// 注： 当数组元素基本有序时， 快速排序将没有任何优势， 基本退化为冒泡排序， 可在选取基准元素时选取中间值进行优化

function quickSort(a, left, right) {
    if (left == right) return;
    let key = partition(a, left, right); //选出key下标
    if (left < key) {
        quickSort(a, left, key - 1); //对key的左半部分排序
    }
    if (key < right) {
        quickSort(a, key + 1, right) //对key的右半部份排序
    }
}

function partition(a, left, right) {
    let key = getKey(a, left, right); //取得key （let key=a[left];//一开始让key为第一个数）
    while (left < right) { //扫描一遍
        while (key <= a[right] && left < right) { //如果key小于a[right]，则right递减，继续比较
            right--;
        }
        [a[left], a[right]] = [a[right], a[left]]; //交换
        while (key >= a[left] && left < right) { //如果key大于a[left]，则left递增，继续比较
            left++;
        }
        [a[left], a[right]] = [a[right], a[left]]; //交换
    }
    return left; //把key现在所在的下标返回
}

// 改进：
// 对于基准位置的选取一般有三种方法： 固定切分， 随机切分和三取样切分。 固定切分的效率并不是太好， 随机切分是常用的一种切分， 效率比较高， 最坏情况下时间复杂度有可能为O(N2)。 对于三数取中选择基准点是最理想的一种。
function getKey(a, left, right) { //三值取中
    let mid = left + Math.floor((right - left) / 2);
    if (a[mid] > a[right])
        [a[mid], a[right]] = [a[right], a[mid]]; //交换
    if (a[left] > a[right])
        [a[left], a[right]] = [a[right], a[left]]; //交换
    if (a[mid] > a[left])
        [a[left], a[right]] = [a[right], a[left]]; //交换
    let key = a[left]; //现在a[mid]<a[left]<a[right];
    return key;
}


//第二种 （只是提供另一种思路，不建议这样写，这种空间复杂度过高）
function quickSort(arr) {
    if (arr.length <= 1) {
        return arr
    }
    var mid = Math.floor(arr.length / 2)
    var midVal = arr.splice(mid, 1)[0]
    var left = []
    var right = []
    for (var i = 0; i < arr.length; i++) {
        var cur = arr[i]
        if (cur < midVal) {
            left.push(cur)
        } else {
            right.push(cur)
        }
    }
    return quickSort(left).concat([midVal], quickSort(right))
}