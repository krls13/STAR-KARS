window.onload = function () {
    var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    if (!isChrome) {
        document.getElementById('iframeAudio').remove()
    }
    else {
        document.getElementById('playAudio').remove() //just to make sure that it will not have 2x audio in the background 
    }


    function raw() {
        var audioNave = new Audio();
        audioNave.src = "./img/lasernave.mp3";
        var audioExplot = new Audio();
        audioExplot.src = "./img/lasermeteor.mp3";
        var audio1 = new Audio();
        audio1.src = "./img/soundscape_5.mp3";
        var audioGameOver = new Audio();
        audioGameOver.src = "./img/gameover.mp3";
        var audioTrash = new Audio();
        audioTrash.src = "./img/explotion.mp3";

        // var rect = {
        //     x: 200,
        //     y: 250,
        //     moveUp: function () { this.y -= 20 },
        //     moveDown: function () { this.y += 20 },
        //     moveLeft: function () { this.x -= 20 },
        //     moveRight: function () { this.x += 20 },
        // }
        /*funcion constructora*/function A(x, y, width, height) {
            //if (x < 0)   this.x = 0
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;

        }
        A.prototype.moveUp = function () {
            this.y -= 20
        }
        A.prototype.moveDown = function () {
            this.y += 20
        }
        A.prototype.moveLeft = function () {
            this.x -= 20
        }
        A.prototype.moveRight = function () {
            this.x += 20
        }
        var rect = new A(40, 260, 150, 100);

        /*array de obstaculos */
        var obstacles = [];
        var bullets = [];
        var score = 0;
        var life = 3;
        var framesCounter = 0;

        var intervalID = setInterval(function () {
            myGameArea.updateCanvas();

            /* detección de colisiones*/
            obstacles.forEach(function (obstacle) {
                if (rect.x + rect.width > obstacle.x && obstacle.x + obstacle.width > rect.x && rect.y + rect.height > obstacle.y && obstacle.y + obstacle.height > rect.y) {


                    // life--;
                    // console.log(life)
                    // if (life === 0) {
                    //     clearInterval(intervalID)
                    // }

                    clearInterval(intervalID);
                    audioTrash.play();
                    audioGameOver.play();
                    document.querySelector('body').innerHTML = "<div class='message'><p>¡¡¡¡ VAMOS CHARLIE !!!!!!</p></div>"
                    //document.write("<div class='message'><p>¡¡¡¡ VAMOS CHARLIE !!!!!!</p></div>")

                };

            })
            bullets.forEach(function (bullet, indexBullet) {
                obstacles.forEach(function (obstacle, indexObstacle) {
                    if (obstacle.x + obstacle.width > bullet.x && bullet.x + bullet.width > obstacle.x && obstacle.y + obstacle.height > bullet.y && bullet.y + bullet.height > obstacle.y) {
                        obstacles.splice(indexObstacle, 1);
                        bullets.splice(indexBullet, 1);
                        score++;
                        audioExplot.play();
                        console.log('score', score);
                        
                    };
                })

            })

            framesCounter++;

            if (framesCounter > 1000) {
                framesCounter = 0;
            };
            if (framesCounter % 100 === 0) {
                generateObstacle();
            }
        }, 1000 / 200);

        generateObstacle = function () {
            obstacles.push(new A(1620, Math.floor(Math.random() * 1000), 40, 40));
        }
        generateBullets = function () {
            audioNave.play();
            var width = 90;
            var height = 25;
            var x = rect.x + rect.width;
            var y = rect.y + (rect.height / 2) - (height / 2);

            bullets.push(new A(x, y, width, height))
            
        }


        //Aqui un set interval, que modifique la x y la y de rect1

        var myGameArea = {
            canvas: document.getElementById('example'),
            img: new Image(),
            imgEnemy: new Image(),
            imgPlayer: new Image(),
            imgBullets: new Image(),
            start: function () {
                this.ctx = this.canvas.getContext('2d');
                this.ctx.fillStyle = "#FF0000";
                this.ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
                this.imgEnemy.src = "img/meteroid.png";
                this.imgPlayer.src = "img/spaceship.png";
                this.imgBullets.src = "img/laseRed.png";

            },
            updateCanvas: function () {
                myGameArea.clearCanvas()
                this.img.src = "img/good.jpg";
                this.ctx.drawImage(this.img, 0, 0, 1680, 972),
                    this.ctx.drawImage(this.imgPlayer, rect.x, rect.y, rect.width, rect.height);

                obstacles.forEach(function (obstacle) {
                    obstacle.x -= 1;
                    this.ctx.drawImage(this.imgEnemy, obstacle.x, obstacle.y, obstacle.width, obstacle.height)
                    //this.ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
                }.bind(this))


                bullets.forEach(function (bullet) {
                    bullet.x += 4;
                    this.ctx.drawImage(this.imgBullets, bullet.x, bullet.y, bullet.width, bullet.height)
                    //this.ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height)
                }.bind(this));

                this.ctx.font = "30px Audiowide";
                this.ctx.fillStyle = "white";
                this.ctx.fillText(Math.floor(score), 160, 50);
                this.ctx.fillText("SCORE:", 20, 50);
                // pintar texto


            },
            clearCanvas: function () {
                this.ctx.clearRect(0, 0, 1680, 972);
            }

        }


        document.onkeydown = function (e) {
            switch (e.keyCode) {
                case 87:
                    rect.moveUp();
                    break;
                case 83: rect.moveDown();
                    break;
                case 65: rect.moveLeft();
                    break;
                case 68: rect.moveRight();
                    break;
                case 32:
                    generateBullets();
                    console.log("pum");
                    break;
            }




        }
        myGameArea.start();




        // var canvas = document.getElementById('example');
        //   var ctx = canvas.getContext('2d');

        //   ctx.fillRect(200, 0, 100, 100);
        //ctx.clearRect(45, 45, 60, 60);
        //ctx.strokeRect(50, 50, 50, 50);
    }

    raw()
}

