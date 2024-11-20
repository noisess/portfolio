document.addEventListener("DOMContentLoaded", () => {
    const draggables = document.querySelectorAll('.draggable');
    const dropZones = document.querySelectorAll('.drop-zone');
    const resetButton = document.getElementById('resetButton');
    const timerElement = document.getElementById('timer');
    const resultMessage = document.getElementById('resultMessage');
    let timerInterval;
    let seconds = 0;
    let totalMatched = 0;

    startTimer();

    shuffleImages();

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', dragStart);
        draggable.addEventListener('dragend', dragEnd);
    });

    dropZones.forEach(zone => {
        zone.addEventListener('dragover', dragOver);
        zone.addEventListener('drop', drop);
    });

    resetButton.addEventListener('click', () => {
        resetGame();
        shuffleImages();
        resetTimer();
        startTimer();
    });

    function dragStart(event) {
        event.dataTransfer.setData("text/plain", event.target.id);
        setTimeout(() => {
            event.target.classList.add('hidden');
        }, 0);
    }

    function dragEnd(event) {
        event.target.classList.remove('hidden');
    }

    function dragOver(event) {
        event.preventDefault();
    }

    function drop(event) {
        event.preventDefault();
        const droppedImageId = event.dataTransfer.getData("text/plain");
        const dropZoneMatch = event.target.getAttribute('data-match');

        if (droppedImageId === dropZoneMatch) {
            event.target.classList.add('correct');
            const image = document.getElementById(droppedImageId);
            event.target.innerHTML = '';
            event.target.appendChild(image);
            image.draggable = false;
            totalMatched++;

            if (totalMatched === dropZones.length) {
                clearInterval(timerInterval);
                displayFinalTime();
            }
        } else {
            event.target.classList.add('wrong');
            setTimeout(() => {
                event.target.classList.remove('wrong');
            }, 1000);
        }
    }

    function resetGame() {
        dropZones.forEach(zone => {
            const fruitName = zone.getAttribute('data-match');
            zone.innerHTML = capitalizeFirstLetter(getFruitNameInPolish(fruitName));
            zone.classList.remove('correct', 'wrong');
        });

        const draggableContainer = document.querySelector('.draggable-container');
        draggables.forEach(image => {
            image.draggable = true;
            draggableContainer.appendChild(image);
        });

        totalMatched = 0;
        resultMessage.classList.add('hidden');
        resultMessage.textContent = '';
    }

    function shuffleImages() {
        const draggableContainer = document.querySelector('.draggable-container');
        const imagesArray = Array.from(draggables);
        imagesArray.sort(() => Math.random() - 0.5);
        imagesArray.forEach(image => {
            draggableContainer.appendChild(image);
        });
    }

    function startTimer() {
        timerInterval = setInterval(() => {
            seconds++;
            updateTimerDisplay();
        }, 1000);
    }

    function resetTimer() {
        clearInterval(timerInterval);
        seconds = 0;
        updateTimerDisplay();
    }

    function updateTimerDisplay() {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        timerElement.textContent = `Time: ${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function getFruitNameInPolish(fruitId) {
        const fruitNames = {
            apple: "Jabłko",
            banana: "Banan",
            blueberry: "Borówki",
            grapes: "Winogrona",
            mango: "Mango",
            orange: "Pomarańcza",
            peach: "Brzoskwinia",
            pear: "Gruszka",
            strawberry: "Truskawka",
            watermelon: "Arbuz"
        };
        return fruitNames[fruitId];
    }

    function displayFinalTime() {
        resultMessage.classList.remove('hidden');
        resultMessage.textContent = `Gratulacje!! Twój końcowy czas to: ${timerElement.textContent.replace("Time: ", "")}`;
    }
});
