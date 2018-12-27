// 归并排序
function mergeSort(arr) {
    var len = arr.length;
    if (len < 2) {
        return arr;
    }
    var middle = Math.floor(len / 2),
        left = arr.slice(0, middle),
        right = arr.slice(middle);

    return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
    var result = [];
    console.time('归并排序耗时');
    while (left.length && right.length) {
        if (left[0] <= right[0]) {
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }

    while (left.length) {
        result.push(left.shift());
    }

    while (right.length) {
        result.push(right.shift());
    }

    console.timeEnd('归并排序耗时');
    return result;
}


// 快速排序
function quickSort(array, left, right) {
    console.time('1.快速排序耗时');
    if (Object.prototype.toString.call(array).slice(8, -1) === 'Array' && typeof left === 'number' && typeof right === 'number') {
        if (left < right) {
            var x = array[right],
                i = left - 1,
                temp;
            for (var j = left; j <= right; j++) {
                if(array[j] <= x) {
                    i++;
                    temp = array[i];
                    array[i] = array[j];
                    array[j] = temp;
                }
            }
            quickSort(array, left, i - 1);
            quickSort(array, i + 1, right);
        }
        console.timeEnd('1.快速排序耗时');
        return array;
    } else {
        return 'array is not an Array or left or right is not a number!';
    }
}

function quickSort2(arr) {
    if(arr.length <= 1) return arr;
    console.time('2.快速排序耗时');
    var pivotIndex = Math.floor(arr.length / 2);
    var pivot = arr.splice(pivotIndex, 1)[0];
    var left = [];
    var right = [];
    for(var i = 0 ;i<arr.length;i++) {
        if(arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }

    console.timeEnd('2.快速排序耗时');
    return quickSort2(left).concat([pivot], quickSort2(right));
}

/**
 * 
 * @param {array} array 待排序数组
 */
function heapSort(array) {
    console.time('堆排序耗时');
    if (Object.prototype.toString.call(array).slice(8, -1) === 'Array') {
        var heapSize = array.length, temp;
        for(var i = Math.floor(heapSize / 2) - 1;i>=0;i--) {
            heapify(array, i, heapSize);
        }
        
        for(var j = heapSize - 1; j >= 1;j--) {
            temp = array[0];
            array[0] = array[j];
            array[j] = temp;
            heapify(array, 0, --heapSize);
        }
        console.timeEnd('堆排序耗时');
        return array;
    } else {
        return 'array is not an Array!';
    }
}

/**
 * 
 * @param {array} arr 数组
 * @param {number} x 下标
 * @param {number} len 长度
 */
function heapify(arr, x, len) {
    if(Object.prototype.toString.call(arr).slice(8, -1) === 'Array' && typeof x === 'number') {
        var l = 2 *  x + 1, r = 2*x+2,largest = x, temp;
        if(l < len && arr[l] > arr[largest]) {
            largest = l;
        }
        if(r < len && arr[r] > arr[largest]) {
            largest = r;
        }
        if(largest != x) {
            temp = arr[x];
            arr[x] = arr[largest];
            arr[largest] = temp;
            heapify(arr, largest, len);
        }
    } else {
        return 'array is not an Array!';
    }
}

var arr=[3,44,38,5,47,15,36,26,27,2,46,4,19,50,48];
// console.log(heapSort(arr))
// console.log(quickSort(arr,0,arr.length-1));//[2, 3, 4, 5, 15, 19, 26, 27, 36, 38, 44, 46, 47, 48, 50]
// console.log(quickSort2(arr));//[2, 3, 4, 5, 15, 19, 26, 27, 36, 38, 44, 46, 47, 48, 50]

/**
 * @description 计数排序
 * @param {array} array 待排序数组
 */
function countingSort(array) {
    var len = array.length,
    B = [],C = [], min = max = array[0];
    console.time('计数排序耗时');
    for (let i = 0; i < len; i++) {
        min = min <= array[i] ? min : array[i];
        max = max >= array[i] ? max : array[i];
        C[array[i]] = C[array[i]] ? C[array[i]] + 1 : 1;
    }
    for (let j = min; j < max; j++) {
        C[j+1] = (C[j+1] || 0) + (C[j]||0);
    }
    for (let k = len - 1; k >= 0; k--) {
        B[C[array[k]] - 1] = array[k];
        C[array[k]]--;
    }
    console.timeEnd('计数排序耗时');
    return B;
}
var arr=[3,44,38,5,47,15,36,26,27,2,46,4,19,50,48];
// console.log(countingSort(arr));

/**
 * @description 桶排序
 * @param {array} array 数组
 * @param {number} num 桶数量
 */
function bucketSort(array, num) {
    if(array.length <= 1) return array;

    var len = array.length, buckets = [], result = [], min = max = array[0], regex='/^[1-9]+[0-9]*$/', space, n = 0;
    num = num || ((num > 1 && regex.test(num)) ? num : 10);
    console.time('桶排序耗时');
    for (let i = 0; i < len; i++) {
        min = Math.min(min, array[i]);
        max = Math.max(max, array[i]);
    }

    space = (max - min + 1) / num;
    for (let j = 0; j < len; j++) {
        var index = Math.floor((array[j] - min) / space);
        if(buckets[index]) {
            var k = buckets[index].length - 1;
            while(k >= 0 && buckets[index][k] > array[j]) {
                buckets[index][k+1] = buckets[index][k];
                k--;
            }
            buckets[index][k+1] = array[j];
        } else {
            buckets[index] = [];
            buckets[index].push(array[j]);
        }
    }
    while(n < num) {
        result = result.concat(buckets[n]);
        n++;
    }
    console.timeEnd('桶排序耗时');
    return result;
}

var arr=[3,44,38,5,47,15,36,26,27,2,46,4,19,50,48];
// console.log(bucketSort(arr,4));

/**
 * @description 基数排序
 * @param {array} arr 待排序数组
 * @param {number} maxDigit 最大位数
 */
function radixSort(arr, maxDigit) {
    var mod = 10;
    var dev = 1;
    var counter = [];
    console.time('基数排序耗时');
    for (let i = 0; i < maxDigit; i++, dev *= 10, mod *= 10) {
        for (let j = 0; j < arr.length; j++) {
            var bucket = parseInt((arr[j] % mod) / dev);
            if(counter[bucket] == null) {
                counter[bucket] = [];
            }
            counter[bucket].push(arr[j]);
        }
        var pos = 0;
        for (let j = 0; j < counter.length; j++) {
            var value = null;
            if(counter[j] != null) {
                while((value = counter[j].shift()) != null) {
                    arr[pos++] = value;
                }
            }
        }
    }
    console.timeEnd('基数排序耗时');
    return arr;
}

var arr=[3,44,38,5,47,15,36,26,27,2,46,4,19,50,48];
console.log(radixSort(arr,2));