#include <inttypes.h>
#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <pthread.h>

#define THREAD_COUNT 4

struct happy_result {
  size_t count;
  uint64_t * nums; // array of coins, an array is a block of memory remember, the count says how many so we know how many blocks
};

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

// void * argument and return are expected by pthread_create so that's why it is used
// So we have to do some casting
void * get_happycoins(void * arg) {
  int attempts = *(int *)arg; // Treat this pointer to a pointer as an int, and get me the value of it
  int limit = attempts / 10000;
  uint32_t seed = time(NULL);
  // Allocate the memory for the array using the limit as the number of results we would expect
  uint64_t * nums = malloc(limit * sizeof(uint64_t));
  struct happy_result * result = malloc(sizeof(struct happy_result));
  result->nums = nums;
  result->count = 0;

  for (int i = 1; i < attempts; i++) {
    if (result-> count == limit) {
      break;
    }
    uint64_t randm_num = random64(&seed);
    if (is_happycoin(randm_num)) {
      result->nums[result->count++] = randm_num;
    }
  }
  return (void *) result;
}

int main() {
  clock_t begin = clock();
  // Declare threads as an array of 4 items on the stack
  pthread_t thread [THREAD_COUNT];

  int attempts = 10000000 / THREAD_COUNT;
  int count = 0;
  // For each thread desired, create a thread
  for (int i = 0; i < THREAD_COUNT; i++) {
    // First arg is the memory address for the thread
    // second idk
    // third is the function to call
    // fourth are the args
    pthread_create(&thread[i], NULL, get_happycoins, &attempts);
  }

  // For each thread, create a result struct in the main thread
  // wait for the thread to finish and I believe assign the result to the same memory address as it
  // then incremement the total count with the result count, and print the nums from that threads result
  // I believe this should work similarly to go routines. Each for loop in the main thread will be blocked until the thread returns
  // but each thread could complete and be ready to go by the time the next for loop cycles around if you have 4 cores (they could run in parallel)
  // If you have less than 4 cores they would run concurrently
  for (int j = 0; j < THREAD_COUNT; j++) {
    struct happy_result * result;
    pthread_join(thread[j], (void **)&result);
    count += result->count;
    for (int k = 0; k < result->count; k++) {
      printf("%" PRIu64 " ", result->nums[k]);
    }
    free(result->nums);
    free(result);
    pthread_detach(thread[j]);
  }

  printf("\ncount %d\n", count);

  clock_t end = clock();
  // Get the time spent in seconds
  double time_spent = (double)(end - begin) / CLOCKS_PER_SEC;
  // Was about 2x faster than non threaded in wsl2
  // Still overhead with printing and spinning threads.
  // Not really sure why it wasn't faster than that, but oh well still pretty good
  printf("\ntime %f\n", time_spent);
  return 0;
}
