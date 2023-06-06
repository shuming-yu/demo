String.format = function () {
  var s = arguments[0];
  if (s == null) return "";
  for (var i = 0; i < arguments.length - 1; i++) {
      var reg = getStringFormatPlaceHolderRegEx(i);
      s = s.replace(reg, (arguments[i + 1] == null ? "" : arguments[i + 1]));

  }
  return cleanStringFormatResult(s);
  //讓輸入的字串可以包含{}
  function getStringFormatPlaceHolderRegEx(placeHolderIndex) {
      return new RegExp('({)?\\{' + placeHolderIndex + '\\}(?!})', 'gm')
  }
  //當format格式有多餘的position時，就不會將多餘的position輸出
  //ex:
  // var fullName = 'Hello. My name is {0} {1} {2}.'.format('firstName', 'lastName');
  // 輸出的 fullName 為 'firstName lastName', 而不會是 'firstName lastName {2}'
  function cleanStringFormatResult(txt) {
      if (txt == null) return "";
      return txt.replace(getStringFormatPlaceHolderRegEx("\\d+"), "");
  }
};
String.prototype.trim = function () {
  if (this == null) {
      this == "";
  }
  return this.replace(/^\s*(.*?)[\s\n]*$/g, '$1');
}
