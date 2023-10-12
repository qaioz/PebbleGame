# PebbleGame

This is a Sethi-ulman-algorithm simulation program,
specifially created for second year computer science  students at KIU,
to solve one of the tasks in the last homework before the midterm in OS.

  What is a pebble game?

  The whole tree represents the derivation tree of a certain arithmetic expression. 
Each node in the tree symbolyzes one arithmetic operation -,+,*,/, and pebble represent registers.
Pebble game simulates the order of calculations that have to be performed by CPU registers.
If the number of required pebbles was 4 for example, it means that calculation of the arithmetic expression
that corresponds the given tree will take 4 registers.

  Rules:
  You can make 3 operations:
  1) set(p,n) - pebble p occupies node n, and n is calculated.
  2) remove(p,n) - pebble p if removed from node n; Becomes free again.
  3) slide(p,n0,n1) - pebble p is removed from n0 and placed on n0s parent n1; n1 is now calulated.
  
  Goal is to use the least number of pebbles to calculate the whole tree with these rules and output the operations.

You can easily draw desired tree and calculate pebble game

![image](https://user-images.githubusercontent.com/100124448/232602577-d02fc5af-2e08-4598-ab00-8eb8651ad074.png)

  Everything is done using js canvas, html and css.
  
  Implementing sethi-ulman-algorthm was a very easy task.
  Challenging part was to write a tree drawing algorithm. Idea I came up with is:
  
  Checking collisions after every addition. If the collision occurs between any two nodes,
  the left and the right subrees of their lowest common anscestor have to be moved apart.
  
  This worked just like I had in mind. No intersections between nodes and the space is used efficiently
  

