import React, { useState, useEffect } from "react";
import "../App.css";
import Bar from "./bar";
import Toolbar from "./toolbar";

/**
 * This component will manage the array of bars and handles the randomization and sorting.
 * It will contain the sorting algorithm functions and use React state to update the bars'
 * heights based on the array.
 */

export default function BarsArray() {
  const [array, setArray] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  // Store the indices of the two active bars
  // Will use this to change the colors of the 2 bars we are comparing
  const [activeIndices, setActiveIndices] = useState([]);

  /**
   * Fisher-Yates shuffle algorithm
   * Starting from the last index of a given array, the algorithm works by iteratively
   * swapping each element with a randomly chosen element from the remaining unshuffled
   * portion of the array.
   */
  const randomizeArray = () => {
    // Create a shallow copy of array and store it in randomizedArray
    const randomizedArray = [...array];
    /**
     * Generate a random index j, where j is between 0 and i (inclusive).
     * Then, generate a random value between 0 (inclusive) and 1 (exclusive).
     * By multiplying it with (i + 1), we scale the range to 0 to i and then use
     * Math.floor() to get an integer value within that range.
     */
    for (let i = randomizedArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [randomizedArray[i], randomizedArray[j]] = [
        randomizedArray[j],
        randomizedArray[i],
      ];
    }
    setArray(randomizedArray);
  };

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  /**
   * Selection Sort
   *
   * Time Complexity: O(N^2)
   *
   * This algorithm works by dividing the input array into two sub-arrays: the leftmost
   * part represents the sorted portion, while the rightmost part represents the
   * unsorted portion. During each iteration, the algorithm finds the minimum value in
   * the unsorted portion and swaps it with the leftmost element of the unsorted portion.
   */
  async function selectionSort(arr) {
    const n = arr.length;
    // Create a copy of the array to avoid modifying the original array
    const sortedArray = arr.slice();

    for (let i = 0; i < n; i++) {
      // First loop iterates through the entire array
      let minIndex = i; // This will hold the index of the lowest number

      for (let j = i + 1; j < n; j++) {
        // Here we look for the index with the lowest number
        if (sortedArray[j] < sortedArray[minIndex]) {
          minIndex = j;
        }
      }

      // Swap the found minimum element with the first element
      if (minIndex !== i) {
        setActiveIndices([i, minIndex]); // Store the indices of the two active bars
        await delay(1000);
        // Swapping the 2 indicies
        [sortedArray[i], sortedArray[minIndex]] = [
          sortedArray[minIndex],
          sortedArray[i],
        ];
        setArray([...sortedArray]); // Update the state with the new sortedArray
        await delay(1000);
        setActiveIndices([]); // Clear the active indices after the swap is done
      }
    }
    return sortedArray;
  }

  /**
   * Bubble sort
   *
   * Time complexity: O(N^2)
   *
   * This algorithm repeatedly steps through the list to be sorted, compares adjacent
   * elements, and swaps them if they are in the wrong order. During each pass through
   * the list, the largest (or smallest, depending on the sorting order) element
   * "bubbles up" to its correct position at the end of the list. This process is repeated
   * until the entire list is sorted.
   */
  async function bubbleSort(arr) {
    const n = arr.length;
    // Create a copy of the array to avoid modifying the original array
    const sortedArray = arr.slice();
    let swapped;

    for (let i = 0; i < n - 1; i++) {
      swapped = false;

      for (let j = 0; j < n - i - 1; j++) {
        // Compare adjacent elements, swap if the first is greater than the second
        if (sortedArray[j] > sortedArray[j + 1]) {
          setActiveIndices([j, j + 1]); // Store the indices of the two active bars
          await delay(1000);
          // Swap adjacent indicies
          [sortedArray[j], sortedArray[j + 1]] = [
            sortedArray[j + 1],
            sortedArray[j],
          ];
          setArray([...sortedArray]); // Update the state with the new sortedArray
          await delay(1000);
          swapped = true;
          setActiveIndices([]); // Clear the active indices after the swap is done
        }
      }
      // If no two elements were swapped in the inner loop, the array is already sorted
      // So, we can break out of the loop early
      if (!swapped) {
        break;
      }
    }
    return sortedArray;
  }

  /**
   * Insertion Sort
   * Time Complexity: O(N^2)
   *
   * This algotithm iterates through the input list and, at each step, selects an element
   * from the unsorted portion and inserts it into its correct position in the sorted
   * portion. The algorithm maintains a sorted portion and an unsorted portion of the array.
   * During each iteration, the algorithm takes the first element from the unsorted portion
   * and compares it with the elements in the sorted portion, moving the elements that are
   * greater than the selected element one position to the right.
   */
  async function insertionSort(arr) {
    const n = arr.length;
    // Create a copy of the array to avoid modifying the original array
    const sortedArray = arr.slice();

    for (let i = 1; i < n; i++) {
      const currentElement = sortedArray[i];
      let j = i - 1;

      // Compare the current element with the elements in the sorted portion
      // and move the elements that are greater than the current element one position to the right
      while (j >= 0 && sortedArray[j] > currentElement) {
        setActiveIndices([j, j + 1]); // Store the indices of the two active bars
        await delay(1000); // Add a delay of 500 milliseconds
        sortedArray[j + 1] = sortedArray[j];
        setArray([...sortedArray]);
        setActiveIndices([]); // Clear the active indices after the swap is done
        j--;
      }

      // Insert the current element into its correct position in the sorted portion
      setActiveIndices([i, j + 1]); // Store the indices of the two active bars
      sortedArray[j + 1] = currentElement;
      await delay(1000);
      setArray([...sortedArray]);
      setActiveIndices([]); // Clear the active indices after the swap is done
    }
    return sortedArray;
  }

  /**
   * Merge Sort
   * Time Complexity: O(N log(N))
   *
   * This is a divide-and-conquer sorting algorithm that works by dividing
   * the unsorted array into smaller subarrays until each subarray contains only one
   * element. It then repeatedly merges these sorted subarrays to create larger sorted
   * arrays until the entire array is sorted.
   */
  async function mergeSort(arr) {
    const n = arr.length;

    if (n <= 1) {
      return arr;
    }

    // Find the middle index to divide the array into two halves
    const mid = Math.floor(n / 2);

    // Divide the array into left and right halves
    const leftHalf = await mergeSort(arr.slice(0, mid));
    const rightHalf = await mergeSort(arr.slice(mid));

    // Merge the sorted left and right halves
    return merge(leftHalf, rightHalf);
  }

  async function merge(leftArr, rightArr) {
    const mergedArray = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < leftArr.length && rightIndex < rightArr.length) {
      if (leftArr[leftIndex] < rightArr[rightIndex]) {
        mergedArray.push(leftArr[leftIndex]);
        leftIndex++;
      } else {
        mergedArray.push(rightArr[rightIndex]);
        rightIndex++;
      }

      await delay(500);
      setArray([
        ...mergedArray,
        ...leftArr.slice(leftIndex),
        ...rightArr.slice(rightIndex),
      ]);
    }

    // Add the remaining elements from leftArr and rightArr to the mergedArray
    setArray([
      ...mergedArray,
      ...leftArr.slice(leftIndex),
      ...rightArr.slice(rightIndex),
    ]);

    return mergedArray
      .concat(leftArr.slice(leftIndex))
      .concat(rightArr.slice(rightIndex));
  }

  /**
   * Quick Sort
   * Time complexity:
   *  Best case: O(N log(N))
   *  Worst case: O(N^2)
   *
   * This is a divide-and-conquer sorting algorithm that sorts an array by recursively
   * partitioning it into smaller subarrays. It works by selecting a pivot element from
   * the array and rearranging the elements such that all elements less than the pivot
   * are on its left and all elements greater than the pivot are on its right. The pivot
   * element then becomes correctly positioned in the sorted array. This process is
   * applied to the subarrays created on the left and right of the pivot until the entire
   * array is sorted.
   */
  async function quickSort(arr, low, high) {
    if (low < high) {
      const pivotIndex = await partition(arr, low, high);
      await quickSort(arr, low, pivotIndex - 1);
      await quickSort(arr, pivotIndex + 1, high);
    }

    return arr;
  }

  async function partition(arr, low, high) {
    const pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      if (arr[j] <= pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        setArray([...arr]); // Update the array state with the swapped elements
      }
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    setArray([...arr]); // Update the array state with the swapped elements

    return i + 1;
  }

  // Heap Sort function
  async function heapSort(arr) {
    const n = arr.length;

    // Build max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      await heapify(arr, n, i);
    }

    // Extract elements from the heap one by one
    for (let i = n - 1; i > 0; i--) {
      // Move current root to the end
      await delay(500); // Add a delay of 500 milliseconds
      [arr[0], arr[i]] = [arr[i], arr[0]];
      setArray([...arr]); // Update the array state with the swapped elements

      // Call max heapify on the reduced heap
      await heapify(arr, i, 0);
    }

    return arr;
  }
  /**
   * Heap sort
   * Time complexity: O(N log(N))
   *
   * This is a comparison-based sorting algorithm that uses the concept of a binary
   * heap to efficiently sort an array. It works by first transforming the unsorted
   * array into a binary heap, which is a special tree-based data structure where
   * the parent node is always greater (for max heap) or smaller (for min heap) than
   * its children. Once the binary heap is constructed, the largest element (in case
   * of max heap) is repeatedly extracted from the root and moved to the end of the
   * array. The heap property is then restored, and the next largest element is extracted
   * and placed at the second last position, and so on.
   */
  async function heapify(arr, n, i) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    // Compare left child with root
    if (left < n && arr[left] > arr[largest]) {
      largest = left;
    }

    // Compare right child with root
    if (right < n && arr[right] > arr[largest]) {
      largest = right;
    }

    if (largest !== i) {
      // Swap the root with the largest element
      setActiveIndices([i, largest]);
      await delay(500); // Add a delay of 500 milliseconds
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      setArray([...arr]); // Update the array state with the swapped elements
      setActiveIndices([]);
      // Recursively heapify the affected sub-tree
      await heapify(arr, n, largest);
    }
  }

  const handleSortClicked = async (algorithm) => {
    let sortedArray;

    if (algorithm === "selection") {
      sortedArray = await selectionSort([...array]);
    } else if (algorithm === "bubble") {
      sortedArray = await bubbleSort([...array]);
    } else if (algorithm === "insertion") {
      sortedArray = await insertionSort([...array]);
    } else if (algorithm === "merge") {
      sortedArray = await mergeSort([...array]);
    } else if (algorithm === "quick") {
      sortedArray = await quickSort([...array]);
    } else if (algorithm === "heap") {
      sortedArray = await heapSort([...array]);
    }
    setArray(sortedArray); // Update the state with the sorted array
  };

  useEffect(() => {
    // Print array after each update
    console.log(array);
  }, [array]);

  return (
    <div>
      <div className="barsarray">
        {array.map((value, index) => (
          <Bar
            key={index}
            height={value * 25}
            active={activeIndices.includes(index)}
          />
        ))}
      </div>
      <Toolbar randomizeArray={randomizeArray} sortArray={handleSortClicked} />
    </div>
  );
}
