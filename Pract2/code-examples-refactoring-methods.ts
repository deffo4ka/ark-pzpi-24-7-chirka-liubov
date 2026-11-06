
// Bad

namespace Before {
  export class TicketCalculator {
 // 1. Rename Method: The name ‘calc’ is not descriptive
    // 2. Replace Magic Numbers: The numbers 18, 80, and 100 are used without explanation
    // 3. Break Down the Conditional: A complex conditional expression on a single line
    public calc(age: number, isStudent: boolean): number {
      if (age < 18 || isStudent) {
        return 80;
      }
      return 100;
    }
  }
}

// ============================================================================
// Good:  3 Refactoring Techniques by Martin Fowler
// ============================================================================
namespace After {
 // Method 2: Replace the Magic Number with a Symbolic Constant  
   const AGE_OF_MAJORITY = 18;
  const DISCOUNTED_PRICE_UAH = 80;
  const STANDARD_PRICE_UAH = 100;

  export class TicketCalculator {
    // Method 1: Rename Method (calc → calculateTicketPrice)
    public calculateTicketPrice(age: number, isStudent: boolean): number {
      // Method 3: Decompose Conditional (extracting a complex condition into a predicate method)
      if (this.isEligibleForDiscount(age, isStudent)) {
        return DISCOUNTED_PRICE_UAH;
      }

      return STANDARD_PRICE_UAH;
    }

    // Helper method for checking eligibility for a discount
    private isEligibleForDiscount(age: number, isStudent: boolean): boolean {
      return age < AGE_OF_MAJORITY || isStudent;
    }
  }
}