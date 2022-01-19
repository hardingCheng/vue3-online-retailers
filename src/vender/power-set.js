// 幂集算法 https://raw.githubusercontent.com/trekhleb/javascript-algorithms/master/src/algorithms/sets/power-set/bwPowerSet.js
// 根据后台返回的skus数据得到有效sku组合
// 根据有效的sku组合得到所有的子集集合
// 根据子集集合组合成一个路径字典，也就是对象。
// 在组件初始化的时候去判断每个规格是否点击
//    再需要更新状态的时候获取当前选中的规格数组
//    遍历所有的规格按钮，拿出按钮的值设置给规格数组，让后得到key
//    拿着key去路径字典中查找，有就可点击，没有禁用即可。
// 在点击规格的时候去判断其他规格是否可点击
// 判断的依据是，拿着说有规格和现在已经选中的规则取搭配，得到可走路径。
// 如果可走路径在字典中，可点击
// 如果可走路径不在字典中，禁用

/**
 * Find power-set of a set using BITWISE approach.
 *
 * @param {*[]} originalSet
 * @return {*[][]}
 */
export default function bwPowerSet(originalSet) {
  const subSets = []

  // We will have 2^n possible combinations (where n is a length of original set).
  // It is because for every element of original set we will decide whether to include
  // it or not (2 options for each set element).
  const numberOfCombinations = 2 ** originalSet.length

  // Each number in binary representation in a range from 0 to 2^n does exactly what we need:
  // it shows by its bits (0 or 1) whether to include related element from the set or not.
  // For example, for the set {1, 2, 3} the binary number of 0b010 would mean that we need to
  // include only "2" to the current set.
  for (
    let combinationIndex = 0;
    combinationIndex < numberOfCombinations;
    combinationIndex += 1
  ) {
    const subSet = []

    for (
      let setElementIndex = 0;
      setElementIndex < originalSet.length;
      setElementIndex += 1
    ) {
      // Decide whether we need to include current element into the subset or not.
      if (combinationIndex & (1 << setElementIndex)) {
        subSet.push(originalSet[setElementIndex])
      }
    }

    // Add current subset to the list of all subsets.
    subSets.push(subSet)
  }

  return subSets
}
