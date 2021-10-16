#include <inttypes.h>
#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <time.h>

uint64_t random64(uint32_t * seed) {
  uint64_t result;
  // Create an array of 8 bit unsigned ints backed by the same memory as result
  // Not sure exactly what that means right now, but this allows us to loop over and set
  // each item in the array to a random number using rand_r which probably only returns an 8 bit int
  // At the base I am assuming a 64 bit int is just 8 8 bit ints strung together though so that might be what is happening here
  uint8_t * result8 = (uint8_t *)&result;
  for (size_t i = 0; i < sizeof(result); i++) {
    result8[i] = rand_r(seed); // each call to rand_r gives us a random "byte" or 8 bits
  }
  return result;
}


// example number 1234
uint64_t sum_digits_squared(uint64_t num) {
  uint64_t total = 0;
  while (num > 0) {
    // first loop num_mod_base = 4
    // first loop num_mod_base = 3
    // first loop num_mod_base = 2
    // first loop num_mod_base = 1
    // taking the mod 10 of a number gives the digits from right to left, because dividing by ten will basically shift the
    // rightmost digit into the decimal places which won't affect the mod
    uint64_t num_mod_base = num % 10;
    // Then add the square of the digit to the total
    total += num_mod_base * num_mod_base;
    num = num / 10;
  }
  return total;
}

bool is_happy(uint64_t num) {
  // 1 means the number is happy, 4 means we are in an infinite loop and the number will not be happy
  while (num != 1 && num != 4) {
    num = sum_digits_squared(num);
  }
  return num == 1;
}

bool is_happycoin(uint64_t num) {
  return is_happy(num) && num % 10000 == 0;
}

int main() {
  clock_t begin = clock();
  uint32_t seed = time(NULL);
  int count = 0;
  for (int i = 1; i < 10000000; i++) {
    uint64_t random_num = random64(&seed);
    if (is_happycoin(random_num)) {
      // PRIu64 is used to print 64 bit unsigned ints properly
      printf("%" PRIu64 " ", random_num);
      count ++;
    }
  }
  printf("\ncount %d\n", count);
  clock_t end = clock();
  // Get the time spent in seconds
  double time_spent = (double)(end - begin) / CLOCKS_PER_SEC;
  printf("\ntime %f\n", time_spent);
  return 0;
}
