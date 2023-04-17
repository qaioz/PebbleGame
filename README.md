# PebbleGame

This is a Sethi-ulman-algorithm simulation program,
specifially created for second year computer science  students at KIU,
to solve one of the tasks in last homework before the midterm in OS.

  What is  pebble game?

  The whole tree represents the derivation tree of a certain arithmetic expression. 
Each node in the tree symbolyzes one arithmetic operation -,+,*,/, and pebble represent registers.
Pebble game simulates the order of calculations that have to be performed by CPU registers.
If the number of required pebbles was 4 for example, it means that calculation of the arithmetic expression
that corresponds the given tree will take 4 registers.

  Rules:
  
  set(p,n) - pebble p occupies node n, and n is calculated
  remove(p,n) - pebble p if removed from node n; Becomes free again
  slide(p,n0,n1) - pebble p is removed from n0 and placed on n0s parent n1; n1 is now calulated; 
  
  Goal is to use the least number of pebbles to calculate the whole tree with these rules.

You can easily draw desired tree and calculate pebble game

![image](https://user-images.githubusercontent.com/100124448/232595216-4e0e7dfa-6851-47b4-8807-5afe3881aae0.png)


