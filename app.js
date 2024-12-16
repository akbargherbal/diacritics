// Helper Functions
const normalizeIndex = (index, sentLen) => {
  if (index >= sentLen) {
    return 0;
  } else {
    return index < 0 ? sentLen - 1 : index;
  }
};

const ar_diacritics = "ًٌٍَُِّْ".split("");
// Initialize AlpineJS Components
document.addEventListener("alpine:init", () => {
  Alpine.data("working_area", () => ({
    activeWorkingArea: false,
    cssWorkingArea: "",
    sentence: "إن الذي سمك السماء بنى لنا ... بيتا دعائمه أعز وأطول",
    wordIndex: 0,
    selectedWord: 0,
    currentCharIndex: 0,
    wordIsSelected: false, // Simple boolean flag
    currentChar: "",
    currentCharID: "",

    init() {
      // Add this watch block to monitor all properties
      this.$watch(
        "activeWorkingArea, cssWorkingArea, sentence, wordIndex, selectedWord, wordIsSelected",
        (value, oldValue) => {
          console.table({
            activeWorkingArea: this.activeWorkingArea,
            cssWorkingArea: this.cssWorkingArea,
            sentence: this.sentence,
            wordIndex: this.wordIndex,
            selectedWord: this.selectedWord,
            wordIsSelected: this.wordIsSelected,
            currentChar: this.currentChar,
            currentCharID: this.currentCharID,
          });
        }
      );
    },

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
      this.wordIsSelected = true;
      this.currentCharIndex = 0;
      this.currentChar = this.selectedWord[this.currentCharIndex];
      this.currentCharID = `w-${this.wordIndex}_ch-${this.currentCharIndex}`;
    },

    getActiveWordIndex(index) {
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
      } else if (event.key === "ArrowLeft" && !event.ctrlKey) {
        this.currentCharIndex++;
      } else if (event.key === "ArrowRight" && !event.ctrlKey) {
        this.currentCharIndex--;
      } else if (event.key === "Backspace") {
        // if last character is a an arabic diacrtiic; then remove it from currentChar;
        const textContent = document.getElementById(this.currentCharID).textContent;
        if (ar_diacritics.includes(textContent.at(-1))){
          document.getElementById(this.currentCharID).textContent = textContent.slice(0, -1);
          return;
        }
      }

      this.wordIndex = normalizeIndex(this.wordIndex, this.sentLen);
      this.selectedWord = this.sentArray[this.wordIndex];
      this.wordIsSelected = true;

      this.currentCharIndex = normalizeIndex(
        this.currentCharIndex,
        this.selectedWord.length
      );

      this.currentChar = this.selectedWord[this.currentCharIndex];
      this.currentCharID = `w-${this.wordIndex}_ch-${this.currentCharIndex}`;

      // append diacrtics to current html:
      if (ar_diacritics.includes(event.key)) {
        document.getElementById(this.currentCharID).innerHTML += event.key;
      }
    },

    // Dynamically log character ID
    logCharacterId(element, wordIndex, idx) {
      const constructedId = `w-${wordIndex}_ch-${idx}`;

      // Log details
      console.log("Extracted:", element.id); // Actual ID
      console.log("Constructed:", constructedId); // Dynamically constructed ID
      console.log(
        "Match:",
        element.id === constructedId ? "✔️ Correct" : "❌ Incorrect"
      );

      // Update state
      this.currentChar = element.textContent;
      this.currentCharID = constructedId;
    },
  }));
});
