exports.compare = function(contents1, contents2, callback) {
  /**
   * Call the compare algorithm for both file, and send result to callback
   */
  // console.log(contents1, contents2)
  compareFiles(contents1, contents2, callback)
}

/**
 * Create a compare result for the given files
 */
function compareFiles(contents1, contents2, callback) {
  var result = [],
    fooIdx = 1,
    barIdx = 1,
    index = 1

  diffContents(contents1, contents2, function(data) {
    data.index = index++

    switch (data.class) {
      case 'foo':
        data.fooIdx = fooIdx++
        break
      case 'bar':
        data.barIdx = barIdx++
        break
      default:
        data.fooIdx = fooIdx++
        data.barIdx = barIdx++
        break
    }

    result.push(data)
  })

  callback(result)
}

/**
 * Compare the given contents, and call the fn for each line
 *
 * @param contents1
 * @param contents2
 * @param appendFn
 */
function diffContents(contents1, contents2, appendFn) {
  var idx1 = -1,
    idx2 = -1

  contents1.some(function(element1, index1) {
    var hasSame = contents2.some(function(element2, index2) {
      return element1 === element2 ? (idx2 = index2) : false
    })
    return hasSame ? (idx1 = index1) : false
  })

  var subSet1 = getContentsToCompare(contents1, idx1),
    subSet2 = getContentsToCompare(contents2, idx2)

  processContents(subSet1, subSet2, appendFn)

  if (contents1[0] !== undefined || contents2[0] !== undefined) {
    diffContents(contents1, contents2, appendFn)
  }
}

/**
 * Extract the contents to compare based on the given element index
 *
 * @param contents
 * @param idx
 * @returns {Array.<T>}
 */
function getContentsToCompare(contents, idx) {
  var qty = idx || 1

  return contents.splice(0, qty !== -1 ? qty : contents.length)
}

/**
 * Generate output result
 *
 * @param contents1
 * @param contents2
 * @param appendFn
 */
function processContents(contents1, contents2, appendFn) {
  for (var i = 0; i < contents1.length || i < contents2.length; i++) {
    var element1 = contents1[i],
      element2 = contents2[i],
      result = {}

    if (element1 === undefined) {
      result.value = '\t+\t' + element2
      result.class = 'bar'
    } else if (element2 === undefined) {
      result.value = '\t-\t' + element1
      result.class = 'foo'
    } else if (element1 === element2) {
      result.value = '\t\t' + element1
      result.class = 'peace'
    } else if (element1 !== element2) {
      result.value = '\t*\t' + element1 + '|' + element2
      result.class = 'war'
    }

    if (result) appendFn(result)
  }
}
