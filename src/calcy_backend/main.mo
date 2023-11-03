import Float "mo:base/Float";
actor Calculator {

  var num : Float = 0;

  public func add(val1 : Float, val2 : Float) : async Float {
    num := val1 +val2;
    return num;
  };

  public func subtract(val1 : Float, val2 : Float) : async Float {
    num := val1 -val2;
    return num;
  };

  public func multiply(val1 : Float, val2 : Float) : async Float {
    num := val1 * val2;
    return num;
  };

  public func divison(val1 : Float, val2 : Float) : async ?Float {
    if (val2 == 0) {
      return null;
    } else {
      num := val1 / val2;
      return ?num;
    };
  };

  public func clearAll() : async Float {
    num := 0;
    return num;
  };

};
