let startBTN = document.querySelector('.start-screen button'),
   myInput = document.querySelector('.start-screen input'),
   userName = document.querySelector('.name span');

startBTN.onclick = function () {
   if (myInput.value == null || myInput.value == "") {
      userName.innerText = "Guest";
   } else {
      userName.innerText = myInput.value;
   };
   document.querySelector('.start-screen').remove();
};

let duration = 1500;
let blocksContain = document.querySelector('.game-block');
let blocks = Array.from(blocksContain.children);
let orderRange = [...Array(blocks.length).keys()];

shuffle(orderRange);

blocks.forEach((block, index) => {
   block.style.order = orderRange[index];
   block.addEventListener('click', () => {flipping(block)});
});

// Flipping Function
function flipping(selectedBlock) {
   selectedBlock.classList.add('flipped');
   let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('flipped'));
   if(allFlippedBlocks.length === 2){
      stopClicking();
      checking(allFlippedBlocks[0], allFlippedBlocks[1]);
   }
};

// Stop Clicking
function stopClicking() {
   blocksContain.classList.add('no-click');
   setTimeout(() => {
      blocksContain.classList.remove('no-click')
   }, duration)
}

// Checking The Blocks
function checking(firstBlock, secondBlock){
   let tries = document.querySelector('.tries span');
   if(firstBlock.dataset.img === secondBlock.dataset.img){
      firstBlock.classList.remove('flipped');
      secondBlock.classList.remove('flipped');
      firstBlock.classList.add('matched');
      secondBlock.classList.add('matched');
   }else{
      tries.innerHTML = parseInt(tries.innerHTML) + 1;
      setTimeout(() => {
         firstBlock.classList.remove('flipped');
         secondBlock.classList.remove('flipped');
      }, duration)
   }
}

// Shuffle Function
function shuffle(array){
   let current = array.length,
   temp, random;
   while(current > 0){
      random = Math.floor(Math.random() * current);
      current--;
      temp = array[current];
      array[current] = array[random];
      array[random] = temp;
   }
   return array;
}

