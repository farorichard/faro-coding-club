# Problem:

A common security method used for online banking is to ask the user for three random characters from a passcode. For example, if the passcode was 531278, they may ask for the 2nd, 3rd, and 5th characters; the expected reply would be: 317.

The text file, [keylog.txt](https://projecteuler.net/resources/documents/0079_keylog.txt), contains fifty successful login attempts.

Given that the three characters are always asked for in order, analyse the file so as to determine the shortest possible secret passcode of unknown length.


# Result

73162890

# Approach


1. Setup an array to store the sorted Passcode \[ x, x1, x2, x3, x4, … \]
2. Check each number

   
   1. Compare one at a time to the array
   2. Sort it to the Passcode array
3. Example:

   ```clike
   -- Queue
   Node   0   1    2   3   4    5   6    7   8   9   10  11
   Count [3] [6 ] [3] [1] [-1] [9] [13] [0] [9] [9] [20] [4]
   
   -- Dependents
   [0] [ x, x, x, x] 
   [1] [ x, x, x, x]
   [2] [ x, x, x, x]
   etc
   ```


4\. Sort

| Queue\[0\]: 34 \n Queue\[1\]: 18 \n Queue\[2\]: 21 \n Queue\[3\]: 2 \n Queue\[4\]: -1 \n Queue\[5\]: -1 \n Queue\[6\]: 20 \n Queue\[7\]: 0 \n Queue\[8\]: 22 \n Queue\[9\]: 40 | Queue\[4\]: -1 \n Queue\[5\]: -1 \n Queue\[7\]: 0 \n Queue\[3\]: 2 \n Queue\[1\]: 18 \n Queue\[6\]: 20 \n Queue\[2\]: 21 \n Queue\[8\]: 22 \n Queue\[0\]: 34 \n Queue\[9\]: 40 |
|----|----|


2\. Queue\[7\]: 0 - \[\] \n Queue\[3\]: 2 - \[1,6\] \n Queue\[1\]: 18 - \[3\] \n Queue\[6\]: 20 - \[7\] \n Queue\[2\]: 21 - \[1, 6\] \n Queue\[8\]: 22 - \[6, 1, 6, 1\] \n Queue\[0\]: 34 - \[8, 9, 2\] \n Queue\[9\]: 40 - \[1, 6, 8\]

Example:

319
680
180
690
129
620
762
689
762
318

## Result:

new_dependents\[0\]: 8,9,2,1,6

new_dependents\[1\]: 3,7

new_dependents\[2\]: 1,6,7

new_dependents\[3\]: 7

new_dependents\[4\]:

new_dependents\[5\]:

new_dependents\[6\]: 7,3,1

new_dependents\[7\]:

new_dependents\[8\]: 6,1,3,2

new_dependents\[9\]: 1,6,2,8,7

## Sorted

new_dependents\[0\]: 8,9,2,1,6


new_dependents\[4\]:

new_dependents\[5\]:

new_dependents\[7\]:

new_dependents\[3\]: 7

new_dependents\[1\]: 3,7

new_dependents\[6\]: 7,3,1

new_dependents\[2\]: 1,6,7

new_dependents\[8\]: 6,1,3,2

new_dependents\[9\]: 1,6,2,8,7




