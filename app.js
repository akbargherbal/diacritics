// Helper Functions
const getCurrentWordIndex = (index, sentLen) => {
  if (index >= sentLen) {
    return 0;
  } else {
    return index < 0 ? sentLen - 1 : index;
  }
};

// Initialize AlpineJS Components
document.addEventListener("alpine:init", () => {
  Alpine.data("working_area", () => ({
    activeWorkingArea: false,
    cssWorkingArea: "",
    sentence: "إن الذي سمك السماء بنى لنا ... بيتًا دعائمه أعز وأطول",
    wordIndex: 0,
    selectedWord: 0,

    get sentArray() {
      return this.sentence.split(" ");
    },
    get sentLen() {
      return this.sentArray.length;
    },

    activateWorkingArea() {
      this.activeWorkingArea = true;
      this.cssWorkingArea = "active";
      console.log(`Working area has been activated? ${this.activeWorkingArea}`);
      console.log(`Sentence Length ${this.sentLen} words`);
    },

    dectivateWorkingArea() {
      this.activeWorkingArea = false;
      this.cssWorkingArea = "";
      console.log(`Working area has been activated? ${this.activeWorkingArea}`);
      console.log(`Sentence Length ${this.sentLen} words`);
    },

    clickedWord(index) {
      console.log(`Clicked on word ${index}`);
      this.wordIndex = index;
      this.selectedWord = this.sentArray[this.wordIndex];
      // console log; word, index and sent[index]
      console.log([
        this.selectedWord,
        this.wordIndex,
        this.sentArray[this.wordIndex],
      ]);
    },

    isSelected(index) {
      console.table(
[        this.activeWorkingArea,
        this.cssWorkingArea,
        this.sentence,
        this.wordIndex,
        this.selectedWord]
      )
      return this.wordIndex === index;

    },

    handleKeyUp(event) {
      console.log("Key up event triggered");
      console.log(event);

      // increment if CTRL + Arrow Right; decrement if CTRL + Arrow Left:
      if (event.ctrlKey && event.key === "ArrowLeft") {
        this.wordIndex++;
      } else if (event.ctrlKey && event.key === "ArrowRight") {
        this.wordIndex--;
      }
      this.wordIndex = getCurrentWordIndex(this.wordIndex, this.sentLen);
      this.selectedWord = this.sentArray[this.wordIndex];
    },
  }));
});
