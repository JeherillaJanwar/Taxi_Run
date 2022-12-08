function rd(t, i) {
	return void 0 === i && (i = t, t = 0), M.random() * (i - t) + t
}

function rp(t) {
	return t[~~rd(t.length)]
}

function normalizeAngle(t) {
	for (; t < -Math.PI;) t += 2 * Math.PI;
	for (; t > Math.PI;) t -= 2 * Math.PI;
	return t
}

function xt(t, i) {
	var e = {};
	for (var s in t) e[s] = t[s];
	for (var s in i) e[s] = i[s];
	return e
}

function shape(t, i) {
	var e = t[0].x,
		s = t[0].y;
	c.sv(), c.tr(e, s), c.fs(i), c.bp(), c.moveTo(0, 0);
	for (var h = 1; h < t.length; h++) c.lineTo(t[h].x - e, t[h].y - s);
	c.closePath(), c.fill(), c.rs()
}

function cache(t, i, e, s) {
	var h = document.createElement("canvas");
	h.width = t, h.height = i;
	var r = h.getContext("2d");
	if (e(h, r, t, i), "pattern" === s) {
		var n = r.createPattern(h, "repeat");
		return n.width = t, n.height = i, n
	}
	return h
}

function noop() {}

function limit(t, i, e) {
	return M.max(i, M.min(e, t))
}

function shuffle(t) {
	for (var i, e, s = t.length; s; i = ~~(M.random() * s), e = t[--s], t[s] = t[i], t[i] = e);
	return t
}

function dist(t, i, e, s) {
	return Math.sqrt((t - e) * (t - e) + (i - s) * (i - s))
}

function createCycle(t) {
	for (var i, e, s, h, r, n = [], a = 0; a < t.length; a++) i = t[a], e = t[(a + 1) % t.length], s = t[(a - 1 + t.length) % t.length], h = Math.atan2(s.y - i.y, s.x - i.x), r = Math.atan2(e.y - i.y, e.x - i.x), n.push({
		x: i.x + 40 * Math.cos(h),
		y: i.y + 40 * Math.sin(h)
	}), n.push({
		x: i.x + 40 * Math.cos(r),
		y: i.y + 40 * Math.sin(r)
	});
	for (a = 0; a < n.length; a++) n[a].next = n[(a + 1) % n.length];
	return n[0]
}

function newCar(color, noLights) {
	return cache(52, 24, function(c, r) {
		with(r) fs("rgba(0,0,0,1)"), fr(0, 0, c.width, c.height), tr((c.width - 50) / 2, (c.height - 22) / 2), fs(color), fr(0, 0, 50, 22), fs("#000"), fr(10, 3, 5, 16), fr(30, 3, 10, 16), fr(15, 1, 7, 1), fr(23, 1, 7, 1), fr(15, 20, 7, 1), fr(23, 20, 7, 1), noLights || (fs("#ff0"), fr(48, 0, 2, 3), fr(48, 19, 2, 3), fs("#f00"), fr(0, 0, 2, 3), fr(0, 19, 2, 3))
	})
}

function Game() {
	with(window.rotation = !0, this.can = document.querySelector("canvas"), this.can) width = P.w, height = P.h;
	this.ctx = window.c = this.can.getContext("2d"), this.start(), this.resize(), addEventListener("resize", this.resize, !1), addEventListener("keydown", this.keyDown.bind(this), !1), addEventListener("keyup", this.keyUp.bind(this), !1), this.lastFrame = Date.now(), raf(function() {
		G.cycle(), raf(arguments.callee)
	}), this.elapsedList = [], this.frameCount = 0, this.frameCountStart = Date.now()
}

function World() {
	wld = this, this.score = 0, this.particles = [], this.cars = [], this.buildings = [], this.clients = [], this.clientSpots = [], this.textures = [], this.trails = [], this.down = {}, this.t = 0;
	for (var t = 8e3, i = 8e3, e = function(t, i, e, s, h) {}, s = function(t, i, e, s, h) {
			var r = new Texture(grass, t, i, e, s);
			wld.textures.push(r), h.visible = !1, h.collides = !1;
			for (var n = 0; n < 10; n++) {
				var a = new Tree(r.x + ~~rd(0, r.w), r.y + ~~rd(0, r.h));
				wld.buildings.push(a)
			}
		}, h = function(t, i, e, s, h) {
			var r = new Texture(parking, t, i, e, s);
			wld.textures.push(r), h.visible = !1, h.collides = !1, wld.textures.push(new Texture(road, r.x - 50, r.y + 100, 50, 100)), wld.textures.push(new Texture(road, r.x + r.w, r.y + 100, 50, 100)), wld.textures.push(new Texture(road, r.x - 50, r.y + r.h - 200, 50, 100)), wld.textures.push(new Texture(road, r.x + r.w, r.y + r.h - 200, 50, 100));
			for (var n = [], t = r.x + 25; t < r.x + r.w - 25; t += 50)
				for (var i = r.y + 50; i < r.y + r.h; i += parking.height) n.push({
					x: t,
					y: i
				}), n.push({
					x: t,
					y: i + 200
				});
			for (var a = 0; a < 10; a++) {
				var o = ~~rd(n.length),
					l = n[o];
				n.splice(o, 1);
				parking.width;
				var c = new Enemy;
				c.x = l.x, c.y = l.y, c.rotation = rp([M.PI / 2, -M.PI / 2]), wld.addCar(c)
			}
		}, r = 0; r <= 10; r++)
		for (a = 0; a <= 10; a++) wld.textures.push(new Texture(xwalkv, 900 * a - 100 - 50, 900 * r - 100, 50, 200)), wld.textures.push(new Texture(xwalkv, 900 * a + 100, 900 * r - 100, 50, 200)), wld.textures.push(new Texture(xwalkh, 900 * a - 100, 900 * r - 100 - 50, 200, 50)), wld.textures.push(new Texture(xwalkh, 900 * a - 100, 900 * r + 100, 200, 50)), wld.textures.push(new Texture(hline, 900 * a + 100 + 50, 900 * r - hline.height / 2, 600, hline.height)), wld.textures.push(new Texture(vline, 900 * a - vline.width / 2, 900 * r + 100 + 50, vline.width, 600));
	for (var n = !1, r = 0; r < 10; r++)
		for (var a = 0; a < 10; a++) {
			var o = 900 * a + 50 + 100,
				l = 900 * r + 50 + 100,
				t = 600,
				i = 600;
			(n = !n && a < 9 && Math.random() < .5) && (t = 2 * t + 200 + 100, a++),
			function(t, i, r, n) {
				var a = new Texture(sidewalk, t - 50, i - 50, r + 100, n + 100);
				wld.textures.push(a);
				var o = new Building(t, i, r, n);
				wld.buildings.push(o), rp([s, s, e, e, e, h])(t, i, r, n, o)
			}(o, l, t, i)
		} [
			[-150, -150, 13e3, -2e3],
			[-150, 9150, 13e3, 2e3],
			[-150, -2100, -2e3, 15e3],
			[9150, -2100, 2e3, 15e3]
		].forEach(function(t) {
			var i = new Building(t[0], t[1], t[2], t[3]);
			i.visible = !1, wld.buildings.push(i), wld.textures.push(new Texture(water, t[0], t[1], t[2], t[3]))
		}), this.textures.push(new Texture(sidewalk, -150, -150, 9300, 50)), this.textures.push(new Texture(sidewalk, -150, 9100, 9300, 50)), this.textures.push(new Texture(sidewalk, -150, -150, 50, 9300)), this.textures.push(new Texture(sidewalk, 9100, -150, 50, 9300)), this.player = this.addCar(new Player), this.player.x = 4500, this.player.y = 4500, this.camX = this.player.x - P.w / 2, this.camY = this.player.y - P.h / 2, this.camRotation = 0;
	for (var c = 0; c < this.buildings.length - 4; c++) {
		var d = this.buildings[c];
		if (d.visible && d.collides || !d.visible && !d.collides) {
			var f = d.getCycle();
			if (f) {
				var p = this.addCar(new Enemy);
				p.x = f.x, p.y = f.y, p.follow(f)
			}
			this.clientSpots = this.clientSpots.concat(d.getCorners(25))
		}
	}
	this.nextClientSpawn = 0, this.timeleft = 180
}

function Menu() {
	this.alpha = 0, Easing.tween(this, "alpha", 0, 1, .5)
}

function Home(t) {
	Menu.call(this)
}

function End(t) {
	Menu.call(this)
}

function Car() {
	this.l = 50, this.w = 30, this.x = 0, this.y = 0, this.rotation = 0, this.speed = 0, this.rotationSpeed = M.PI, this.rotationDir = 0, this.vectors = [], this.accelerates = !1, this.brakes = !1, this.maxSpeed = 500, this.drifts = !0, this.t = 0, this.maxAcceleration = 400, this.maxDeceleration = 1e5, this.maxDeceleration = 400, this.speedVector = {}, this.moveAngle = 0, this.moveAngleSpeed = 1.5 * M.PI, this.radius = 10, this.carType = rp([car.white, car.blue, car.red, car.green, car.purple, car.gray])
}

function Player() {
	Car.call(this), this.carType = car.yellow, this.client = null, this.hud = new HUD, this.lastGoodPosition = null, this.nextGoodPosition = null, this.nextGoodPositionTimer = 0, this.cash = 0, this.lives = 3, this.dropoffs = 0
}

function Enemy() {
	Car.call(this), this.path = null, this.maxSpeed = 100, this.distanceLeft = 0, this.drifts = !1
}

function Client() {
	this.x = this.y = 0, this.done = !1, this.type = rp([clientRed, clientBlue, clientBlack, clientYellow])
}

function HUD() {
	this.msgT = 0
}

function Building(t, i, e, s) {
	this.x = t, this.y = i, this.w = e, this.h = s, this.w < 0 && (this.x += this.w, this.w = -this.w), this.h < 0 && (this.y += this.h, this.h = -this.h), this.visible = !0, this.collides = !0
}

function Texture(t, i, e, s, h) {
	this.t = t, this.x = i, this.y = e, this.w = s, this.h = h, this.w < 0 && (this.x += this.w, this.w = -this.w), this.h < 0 && (this.y += this.h, this.h = -this.h)
}

function linear(t, i, e, s) {
	return t / s * e + i
}

function easeOutBack(t, i, e, s, h) {
	return void 0 == h && (h = 1.70158), e * ((t = t / s - 1) * t * ((h + 1) * t + h) + 1) + i
}

function easeOutBounce(t, i, e, s) {
	return (t /= s) < 1 / 2.75 ? e * (7.5625 * t * t) + i : t < 2 / 2.75 ? e * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + i : t < 2.5 / 2.75 ? e * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + i : e * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + i
}

function Particle(t, i, e) {
	this.s = t, this.c = i, this.a = e
}

function Tree(t, i) {
	this.x = t, this.y = i, this.collides = !0
}
var _ = window,
	raf = _.requestAnimationFrame || _.webkitRequestAnimationFrame || _.mozRequestAnimationFrame || function(t) {
		setTimeout(t, 1e3 / 60)
	},
	M = Math,
	abs = M.abs,
	to = setTimeout,
	p = CanvasRenderingContext2D.prototype;
p.fr = p.fillRect, p.sv = p.save, p.rs = p.restore, p.tr = p.translate, p.lt = p.lineTo, p.mt = p.moveTo, p.sc = p.scale, p.bp = p.beginPath, p.clg = p.createLinearGradient, p.rt = p.rotate, p.ft = p.fillText, p.alpha = function(t) {
	this.globalAlpha = t
}, p.fs = function(t) {
	this.fillStyle = t
}, p.di = function(t, i, e) {
	this.drawImage.apply(this, arguments)
};
for (var i in p) _[i] = function(t) {
	return function() {
		c[t].apply(c, arguments)
	}
}(i);
var P = {
	w: 700,
	h: 700,
	v: 130
};
Game.prototype = {
	start: function() {
		this.world = new World, this.menu = new Home
	},
	restart: function() {
		this.world = new World, this.menu = null
	},
	gameOver: function() {
		this.menu = new End
	},
	cycle: function() {
		sv(), sc(this.resolution, this.resolution);
		var t = Date.now(),
			i = (t - this.lastFrame) / 1e3;
		if (this.lastFrame = t, this.world.cycle(i), this.menu && this.menu.cycle(i), Easing.cycle(i), 200 === ++this.frameCount) {
			var e = Date.now() - this.frameCountStart;
			this.frameCount / (e / 1e3) < 30 && this.setResolution(.6)
		}
		rs()
	},
	newWorld: function() {
		this.world = new World
	},
	resize: function() {
		to(function() {
			var t, i, e = innerWidth,
				s = innerHeight,
				h = e / s,
				r = P.w / P.h,
				n = (abs(h - r), document.getElementById("canvascontainer").style);
			h <= r ? i = (t = e) / r : t = (i = s) * r, n.width = t + "px", n.height = i + "px"
		}, 1e3)
	},
	keyDown: function(t) {
		if (32 != t.keyCode && 40 != t.keyCode && 38 != t.keyCode || t.preventDefault(), 82 == t.keyCode && (window.rotation = !window.rotation), this.menu) return this.menu.keyDown(t.keyCode);
		this.world.keyDown(t.keyCode)
	},
	keyUp: function(t) {
		this.menu || this.world.keyUp(t.keyCode)
	},
	setResolution: function(t) {
		this.can.width = P.w * t, this.can.height = P.h * t, this.resolution = t
	}
}, World.prototype = {
	cycle: function(t) {
		this.t += t, this.nextClientSpawn -= t, this.nextClientSpawn <= 0 && (this.respawnClients(), this.nextClientSpawn = 5), fs(road), fr(0, 0, P.w, P.h);
		for (var i in this.cars) this.cars[i].cycle(t);
		this.player.dead;
		this.camX = wld.player.x - P.w / 2 + 100 * M.cos(wld.player.moveAngle), this.camY = wld.player.y - P.h / 2 + 100 * M.sin(wld.player.moveAngle), this.shakeTime > 0 && (this.camX += rd(-10, 10), this.camY += rd(-10, 10));
		var e = -this.player.rotation - M.PI / 2 - this.camRotation;
		e = normalizeAngle(e);
		var s = M.max(abs(e) / M.PI, .01) * M.PI * 2;
		e = limit(e, -s * t, s * t), this.camRotation += e, this.shakeTime -= t, sv(), window.rotation && (tr(P.w / 2, P.h / 2), rotate(this.camRotation), tr(-P.w / 2, -P.h / 2)), tr(-~~this.camX, -~~this.camY), fs(road), fr(~~this.camX, ~~this.camY, P.w, P.h);
		for (var i in this.textures) this.textures[i].render();
		for (var i in this.clients) this.clients[i].cycle(t);
		for (i = this.cars.length - 1; i >= 0; i--) this.cars[i].render();
		for (i = this.particles.length - 1; i >= 0; i--) this.particles[i].render();
		for (var i in this.buildings) this.buildings[i].render();
		this.player.render2(), rs(), G.menu || (this.player.hud.cycle(t), this.player.client || (this.timeleft -= t, this.timeleft <= 0 && G.gameOver())), this.player.x < -this.roadSize / 2 && this.player.explode()
	},
	keyUp: function(t) {
		this.down[t] = 0, this.evalKeyboardMovement()
	},
	keyDown: function(t) {
		this.down[t] = !0, this.evalKeyboardMovement()
	},
	evalKeyboardMovement: function() {
		this.player.rotationDir = 0, this.player.accelerates = !1, this.player.brakes = !1, this.down[37] && (this.player.rotationDir = -1), this.down[39] && (this.player.rotationDir = 1), this.down[38] && (this.player.accelerates = !0), this.down[40] && (this.player.brakes = !0), this.down[32] && G.start()
	},
	addParticle: function(t) {
		this.particles.push(t)
	},
	removeParticle: function(t) {
		var i = this.particles.indexOf(t);
		i >= 0 && this.particles.splice(i, 1)
	},
	addBuilding: function(t) {
		return this.buildings.push(t), t
	},
	addCar: function(t) {
		return this.cars.push(t), t
	},
	removeCar: function(t) {
		var i = this.cars.indexOf(t);
		i >= 0 && this.cars.splice(i, 1)
	},
	addClient: function(t) {
		return this.clients.push(t), t
	},
	removeClient: function(t) {
		var i = this.clients.indexOf(t);
		i >= 0 && this.clients.splice(i, 1)
	},
	getRandomDestination: function() {
		return rp(this.clientSpots)
	},
	respawnClients: function() {
		for (var t = M.max(P.w, P.h), i = 2 * M.max(P.w, P.h), e = this.clients.length - 1; e >= 0; e--)(h = dist((a = this.clients[e]).x, a.y, this.camX + P.w / 2, this.camY + P.h / 2)) > i && this.clients.splice(e, 1);
		for (var s = [], e = 0; e < this.clientSpots.length; e++) {
			var h = dist((n = this.clientSpots[e]).x, n.y, this.camX + P.w / 2, this.camY + P.h / 2);
			h < i && h > t && s.push(n)
		}
		for (; s.length > 0 && this.clients.length < 10;) {
			var r = ~~rd(s.length),
				n = s[r];
			s.splice(r, 1);
			var a = this.addClient(new Client);
			a.x = n.x, a.y = n.y
		}
	},
	findClosestClientSpot: function(t, i) {
		for (var e, s, h, r, n = 0; n < this.clientSpots.length; n++) h = dist((e = this.clientSpots[n]).x, e.y, t, i), (!r || h < s) && (r = e, s = h);
		return r
	},
	shake: function() {
		this.shakeTime = .5
	}
}, Menu.prototype = {
	cycle: function(t) {
		alpha(this.alpha), fs("rgba(0,0,0,.7)"), fr(0, 0, P.w, P.h)
	}
}, Home.prototype = xt(Menu.prototype, {
	cycle: function(t) {
		Menu.prototype.cycle.call(this, t);
		var i = "taxi run",
			e = textWidth(i);
		drawText(c, i, "white", (P.w - e) / 2, 150, 1, 1), e = textWidth(i = "find customers and drive them to their destination", .25), drawText(c, i, "white", (P.w - e) / 2, 230, .25, 1), e = textWidth(i = "press enter to start", .5), drawText(c, i, "white", (P.w - e) / 2, 400, .5, 1), e = textWidth(i = "press r to toggle rotation", .5), drawText(c, i, "white", (P.w - e) / 2, 450, .5, 1), e = textWidth(i = "made by ishaan sharma", .5), drawText(c, i, "white", (P.w - e) / 2, 550, .5, 1), alpha(1)
	},
	keyDown: function(t) {
		13 === t && (G.menu = null)
	}
}), End.prototype = xt(Menu.prototype, {
	cycle: function(t) {
		Menu.prototype.cycle.call(this, t);
		e = textWidth(i = "game over");
		drawText(c, i, "white", (P.w - e) / 2, 200, 1, 1);
		var i = "you served " + wld.player.dropoffs + " customers",
			e = textWidth(i, .5);
		drawText(c, i, "white", (P.w - e) / 2, 350, .5, 1);
		var i = "and collected $" + wld.player.cash,
			e = textWidth(i, .5);
		drawText(c, i, "white", (P.w - e) / 2, 400, .5, 1);
		e = textWidth(i = "press enter to try again", .5);
		drawText(c, i, "white", (P.w - e) / 2, 540, .5, 1), alpha(1)
	},
	keyDown: function(t) {
		13 === t && G.restart()
	}
}), Car.prototype = {
	cycle: function(t) {
		if (this.t += t, !this.dead) {
			this.rotation, Math.PI;
			var i = limit(1 - this.speed / this.maxSpeed, .5, 1),
				e = normalizeAngle(this.rotation - this.moveAngle),
				s = limit(e, -this.moveAngleSpeed * i * t, this.moveAngleSpeed * i * t);
			this.moveAngle += this.drifts ? s : e;
			var h = limit(3 * this.speed / this.maxSpeed, -1, 1);
			this.rotation += this.rotationSpeed * t * this.rotationDir * h, this.x += this.speed * M.cos(this.moveAngle) * t, this.y += this.speed * M.sin(this.moveAngle) * t;
			var r = 0,
				n = !1;
			this.accelerates ? (r = this.maxSpeed, this.speed < 0 && (n = !0)) : this.brakes && (r = -this.maxSpeed / 2, this.speed > 0 && (n = !0));
			var a = r - this.speed,
				o = n ? 2 * this.maxAcceleration : this.maxAcceleration;
			a = limit(a, -t * o, t * o), this.speed += a;
			var l = abs(normalizeAngle(this.rotation - this.moveAngle)) / M.PI;
			this.speed = limit(this.speed - l * t * this.maxDeceleration * 2, -this.maxSpeed, this.maxSpeed)
		}
	},
	render: function() {
		sv(), tr(this.x, this.y), rt(this.rotation);
		var t = this.dead ? brokenCar : this.carType;
		di(t, -t.width / 2, -t.height / 2), rs()
	},
	explode: function() {
		this.dead = !0;
		for (var t = 0; t < 40; t++) {
			var i = new Particle(5, rp(["#ff0", "#f00", "#ff8400", "#000"]));
			i.x = this.x + rd(-5, 5), i.y = this.y + rd(-5, 5), wld.addParticle(i);
			var e = rd(2 * M.PI),
				s = rd(20, 100),
				h = rd(.5, 1);
			Easing.tween(i, "x", i.x, i.x + M.cos(e) * s, h), Easing.tween(i, "y", i.y, i.y + M.sin(e) * s, h), Easing.tween(i, "a", 1, 0, h), Easing.tween(i, "s", i.s, i.s * rd(5, 10), h, 0, linear, function() {
				wld.removeParticle(i)
			})
		}
	},
	collidesWith: function(t) {
		return dist(t.x, t.y, this.x, this.y) < this.radius + t.radius
	}
}, Player.prototype = xt(Car.prototype, {
	cycle: function(t) {
		this.x, this.y, this.rotation;
		if (this.noControlTimer -= t, this.noControlTimer >= 0 && (this.accelerates = !1, this.rotationDir = 0), Car.prototype.cycle.call(this, t), !this.dead) {
			if (this.nextGoodPositionTimer -= t, this.nextGoodPositionTimer <= 0 && (this.lastGoodPosition = this.nextGoodPosition, this.nextGoodPosition = {
					x: this.x,
					y: this.y
				}, this.nextGoodPositionTimer = .1), this.accelerates && this.speed < 400 || this.brakes && this.speed > -200 || abs(this.speed) > 20 && abs(normalizeAngle(this.rotation - this.moveAngle)) > Math.PI / 8) {
				var i = -this.l / 2,
					e = new Particle(5, "#fff");
				e.x = this.x + M.cos(this.rotation) * i + rd(-5, 5), e.y = this.y + M.sin(this.rotation) * i + rd(-5, 5), wld.addParticle(e);
				var s = rd(.3, .6);
				this.rotation, M.PI, rd(-M.PI / 32, M.PI / 32);
				Easing.tween(e, "a", 1, 0, s), Easing.tween(e, "s", e.s, e.s * rd(5, 10), s, 0, linear, function() {
					wld.removeParticle(this)
				})
			}
			var h = this;
			wld.buildings.forEach(function(t) {
				!h.dead && t.collides && t.contains(h.x, h.y) && h.explode()
			}), wld.cars.forEach(function(t) {
				h.dead || t === h || t.dead || !t.collidesWith(h) || h.collided(t)
			}), this.client && (this.clientTimeLeft = M.max(0, this.clientTimeLeft - t), dist(this.x, this.y, this.clientSettings.destination.x, this.clientSettings.destination.y) < this.clientSettings.radius ? 0 === this.speed && this.drop() : 0 == this.clientTimeLeft && this.speed < 100 && this.drop())
		}
	},
	render2: function() {
		if (this.clientSettings && !this.dead) {
			var t = this.t % 1 * this.clientSettings.radius;
			alpha(.3), c.fillStyle = "#0f0", c.lineWidth = 4, c.strokeStyle = "#0f0", c.beginPath(), c.arc(this.clientSettings.destination.x, this.clientSettings.destination.y, t, 0, 2 * M.PI, !0), c.fill(), c.stroke(), alpha(1);
			var i = dist(this.x, this.y, this.clientSettings.destination.x, this.clientSettings.destination.y),
				e = M.atan2(this.clientSettings.destination.y - this.y, this.clientSettings.destination.x - this.x),
				s = 200 * limit(i / 1e4, 0, 1) + 100;
			i > 300 && (sv(), tr(this.x + M.cos(e) * s, this.y + M.sin(e) * s), c.rotate(e), di(arrow, -arrow.width / 2, -arrow.height / 2), rs())
		}
	},
	pickup: function(t) {
		this.client || (this.client = t, this.clientSettings = t.getDestinationSettings(), this.clientTimeLeft = this.clientSettings.time, wld.removeClient(t))
	},
	drop: function() {
		this.client.done = !0, this.client.x = this.x + 40 * M.cos(this.rotation + M.PI / 2), this.client.y = this.y + 40 * M.sin(this.rotation + M.PI / 2), this.client.findSidewalk(), wld.addClient(this.client);
		var t = dist(this.x, this.y, this.clientSettings.destination.x, this.clientSettings.destination.y) <= this.clientSettings.radius ? this.clientSettings.price : 0;
		t > 0 ? (this.hud.message("reward: $" + t), this.cash += t) : this.hud.message("too slow"), this.client = null, this.clientSettings = null, this.dropoffs++
	},
	collided: function(t) {
		this.explode(), t.explode(), wld.removeCar(t), window.collider = t
	},
	explode: function() {
		Car.prototype.explode.call(this), --this.lives > 0 ? setTimeout(this.respawn.bind(this), 2e3) : setTimeout(G.gameOver.bind(G), 2e3), wld.shake()
	},
	respawn: function() {
		this.hud.message("cars left: " + this.lives), this.client = null, this.clientTimeLeft = 0, this.clientSettings = null, this.dead = !1, this.x = this.lastGoodPosition.x, this.y = this.lastGoodPosition.y, this.speed = 0
	}
}), Enemy.prototype = xt(Car.prototype, {
	cycle: function(t) {
		this.accelerates = !!this.path;
		var i = M.atan2(wld.player.y - this.y, wld.player.x - this.x),
			e = dist(wld.player.x, wld.player.y, this.x, this.y);
		if (abs(normalizeAngle(i - this.rotation)) < M.PI / 4 && e < 300 && (this.accelerates = !1), this.path) {
			var s = normalizeAngle(M.atan2(this.path.y - this.y, this.path.x - this.x) - this.rotation);
			s = limit(s, -this.rotationSpeed * t, this.rotationSpeed * t), this.rotation += s, dist(this.x, this.y, this.path.x, this.path.y) < t * this.speed && (this.x = this.path.x, this.y = this.path.y, this.follow(this.path.next))
		}
		Car.prototype.cycle.call(this, t)
	},
	follow: function(t) {
		this.path = t
	}
}), Client.prototype = {
	cycle: function(t) {
		if ((e = dist(this.x, this.y, wld.player.x, wld.player.y)) < 200 && !wld.player.dead && wld.player.speed < 100 && !this.done && !wld.player.client)
			if (this.target = null, e < 30 && wld.player.speed < 50) wld.player.pickup(this);
			else {
				var i = Math.min(50 * t, e);
				this.x += M.cos(this.angle) * i, this.y += M.sin(this.angle) * i
			}
		else this.target || this.findSidewalk();
		if (this.target) {
			var e = dist(this.x, this.y, this.target.x, this.target.y);
			(i = Math.min(50 * t, e)) > 0 && (this.angle = M.atan2(this.target.y - this.y, this.target.x - this.x), this.x += M.cos(this.angle) * i, this.y += M.sin(this.angle) * i)
		} else this.angle = M.atan2(wld.player.y - this.y, wld.player.x - this.x);
		var s = this;
		wld.cars.forEach(function(t) {
			dist(s.x, s.y, t.x, t.y) < 20 && abs(t.speed) > 20 && s.die()
		}), this.render()
	},
	render: function() {
		sv(), tr(this.x, this.y), rt(this.angle), di(this.type, -this.type.width / 2, -this.type.height / 2), rs()
	},
	getDestinationSettings: function() {
		var t = wld.getRandomDestination(),
			i = abs(this.x - t.x) + abs(this.y - t.y),
			e = ~~rd(1, 4),
			s = ~~(e / 3 * .01 * i);
		return {
			destination: t,
			exigence: e,
			time: (1 - e / 4) * (4 * (i / wld.player.maxSpeed)),
			price: M.max(5, s),
			radius: 200
		}
	},
	die: function() {
		wld.removeClient(this);
		for (var t = 0; t < 40; t++) {
			var i = new Particle(4, "#950000", 1),
				e = rd(2 * M.PI),
				s = rd(5, 25),
				h = rd(.05, .2);
			i.x = this.x, i.y = this.y, wld.addParticle(i), Easing.tween(i, "a", 1, 0, 1, 3, linear, i.remove.bind(i)), Easing.tween(i, "x", i.x, i.x + M.cos(e) * s, h), Easing.tween(i, "y", i.y, i.y + M.sin(e) * s, h)
		}
		wld.player.hud.message("don't kill customers!")
	},
	findSidewalk: function() {
		var t = wld.findClosestClientSpot(this.x, this.y);
		this.target = {
			x: t.x + rd(-15, 15),
			y: t.y + rd(-15, 15)
		}
	}
}, HUD.prototype = {
	cycle: function(t) {
		this.msgT -= t;
		var i;
		i = wld.player.dead ? "wasted" : this.msgT > 0 ? this.msg : wld.player.client ? "customer time left: " + M.ceil(M.max(0, wld.player.clientTimeLeft)) : "find a customer";
		var e = textWidth(i, .5),
			s = (P.w - e) / 2,
			h = P.h / 2 + 200;
		drawText(c, i, "white", s, h, .5, 1), i = "cash: $" + wld.player.cash, e = textWidth(i, .5), drawText(c, i, "white", P.w - e - 20, 20, .5, 1), drawText(c, "cars: " + wld.player.lives, "white", 20, 20, .5, 1), wld.player.client || (i = "time: " + ~~wld.timeleft, e = textWidth(i, .5), drawText(c, i, "white", (P.w - e) / 2, 20, .5, 1))
	},
	message: function(t) {
		this.msgT = 2, this.msg = t.toLowerCase()
	}
}, Building.prototype = {
	render: function() {
		if (this.visible && !(this.x > wld.camX + P.w + P.v || this.y > wld.camY + P.h + P.v || this.x + this.w < wld.camX - P.v || this.y + this.h < wld.camY - P.v)) {
			var t = {
					x: this.x,
					y: this.y
				},
				i = {
					x: this.x + this.w,
					y: this.y
				},
				e = {
					x: this.x + this.w,
					y: this.y + this.h
				},
				s = {
					x: this.x,
					y: this.y + this.h
				},
				h = this.pointUpperPosition(this.x, this.y),
				r = this.pointUpperPosition(this.x + this.w, this.y),
				n = this.pointUpperPosition(this.x + this.w, this.y + this.h),
				a = this.pointUpperPosition(this.x, this.y + this.h),
				o = h.x,
				l = h.y,
				c = n.x - h.x,
				d = n.y - h.y;
			if (sv(), tr(o, l), fs(roofb), fr(0, 0, c, d), fs(roof), fr(20, 20, c - 40, d - 40), rs(), fs("#00f"), h.x > t.x) {
				shape([t, h, a, s], side1);
				for (var f = this.h / 50, p = .3, w = this.h / f, u = p / 2; u < 1; u += p)
					for (l = this.y + w / 2; l < this.y + this.h; l += w) {
						var y = this.pointUpperPosition(this.x, l - 12.5, u),
							x = this.pointUpperPosition(this.x, l - 12.5, u + p / 2),
							v = this.pointUpperPosition(this.x, l + 12.5, u);
						shape([y, x, m = this.pointUpperPosition(this.x, l + 12.5, u + p / 2), v], "black")
					}
			}
			if (r.x < i.x) {
				shape([r, i, e, n], side1);
				for (var f = this.h / 50, p = .3, w = this.h / f, u = p / 2; u < 1; u += p)
					for (l = this.y + w / 2; l < this.y + this.h; l += w) {
						var y = this.pointUpperPosition(this.x + this.w, l - 12.5, u),
							x = this.pointUpperPosition(this.x + this.w, l - 12.5, u + p / 2),
							v = this.pointUpperPosition(this.x + this.w, l + 12.5, u);
						shape([y, x, m = this.pointUpperPosition(this.x + this.w, l + 12.5, u + p / 2), v], "black")
					}
			}
			if (h.y > t.y) {
				shape([t, h, r, i], side2);
				for (var f = this.w / 50, p = .3, g = this.w / f, u = p / 2; u < 1; u += p)
					for (o = this.x + g / 2; o < this.x + this.w; o += g) {
						var y = this.pointUpperPosition(o - 12.5, this.y, u),
							x = this.pointUpperPosition(o - 12.5, this.y, u + p / 2),
							v = this.pointUpperPosition(o + 12.5, this.y, u);
						shape([y, x, m = this.pointUpperPosition(o + 12.5, this.y, u + p / 2), v], "black")
					}
			}
			if (a.y < s.y) {
				shape([s, a, n, e], side2);
				for (var f = this.w / 50, p = .3, g = this.w / f, u = p / 2; u < 1; u += p)
					for (o = this.x + g / 2; o < this.x + this.w; o += g) {
						var y = this.pointUpperPosition(o - 12.5, this.y + this.h, u),
							x = this.pointUpperPosition(o - 12.5, this.y + this.h, u + p / 2),
							v = this.pointUpperPosition(o + 12.5, this.y + this.h, u),
							m = this.pointUpperPosition(o + 12.5, this.y + this.h, u + p / 2);
						shape([y, x, m, v], "black")
					}
			}
		}
	},
	pointUpperPosition: function(t, i, e) {
		isNaN(e) && (e = 1);
		var s = t - (wld.camX + P.w / 2),
			h = i - (wld.camY + P.h / 2);
		return {
			x: t + s / P.h * 200 * e,
			y: i + h / P.h * 200 * e
		}
	},
	contains: function(t, i) {
		return t >= this.x - 10 && i >= this.y - 10 && t <= this.x + this.w + 10 && i <= this.y + this.h + 10
	},
	getCycle: function() {
		for (var t = createCycle(this.getCorners(100)), i = rd(8), e = 0; e < i; e++) t = t.next;
		return t
	},
	getCorners: function(t) {
		return [{
			x: this.x - t,
			y: this.y - t
		}, {
			x: this.x + this.w + t,
			y: this.y - t
		}, {
			x: this.x + this.w + t,
			y: this.y + this.h + t
		}, {
			x: this.x - t,
			y: this.y + this.h + t
		}]
	}
}, Texture.prototype = {
	render: function() {
		this.x > wld.camX + P.w + P.v || this.y > wld.camY + P.h + P.v || this.x + this.w < wld.camX - P.v || this.y + this.h < wld.camY - P.v || (sv(), tr(this.x, this.y), fs(this.t), fr(0, 0, this.w, this.h), rs())
	}
};
var defs = {
		a: [
			[1, 1, 1],
			[1, , 1],
			[1, 1, 1],
			[1, , 1],
			[1, , 1]
		],
		b: [
			[1, 1, 1],
			[1, , 1],
			[1, 1],
			[1, , 1],
			[1, 1, 1]
		],
		c: [
			[1, 1, 1],
			[1, , ],
			[1, , ],
			[1, , ],
			[1, 1, 1]
		],
		d: [
			[1, 1, 0],
			[1, , 1],
			[1, , 1],
			[1, , 1],
			[1, 1, 1]
		],
		e: [
			[1, 1, 1],
			[1, , ],
			[1, 1],
			[1, , ],
			[1, 1, 1]
		],
		f: [
			[1, 1, 1],
			[1, , ],
			[1, 1],
			[1, , ],
			[1, , ]
		],
		g: [
			[1, 1, 1],
			[1, , ],
			[1, , ],
			[1, , 1],
			[1, 1, 1]
		],
		h: [
			[1, , 1],
			[1, , 1],
			[1, 1, 1],
			[1, , 1],
			[1, , 1]
		],
		i: [
			[1, 1, 1],
			[, 1],
			[, 1],
			[, 1],
			[1, 1, 1]
		],
		j: [
			[, , 1],
			[, , 1],
			[, , 1],
			[1, , 1],
			[1, 1, 1]
		],
		k: [
			[1, , 1],
			[1, , 1],
			[1, 1],
			[1, , 1],
			[1, , 1]
		],
		l: [
			[1, , 0],
			[1, , ],
			[1, , ],
			[1, , ],
			[1, 1, 1]
		],
		m: [
			[1, , 1],
			[1, 1, 1],
			[1, , 1],
			[1, , 1],
			[1, , 1]
		],
		n: [
			[1, 1, 1],
			[1, , 1],
			[1, , 1],
			[1, , 1],
			[1, , 1]
		],
		o: [
			[1, 1, 1],
			[1, , 1],
			[1, , 1],
			[1, , 1],
			[1, 1, 1]
		],
		p: [
			[1, 1, 1],
			[1, , 1],
			[1, 1, 1],
			[1, , ],
			[1, , ]
		],
		r: [
			[1, 1, 1],
			[1, , 1],
			[1, 1],
			[1, , 1],
			[1, , 1]
		],
		s: [
			[1, 1, 1],
			[1, , ],
			[1, 1, 1],
			[, , 1],
			[1, 1, 1]
		],
		$: [
			[, , 1, , 0],
			[1, 1, 1, 1, 1],
			[1, , 1, , ],
			[1, 1, 1, 1, 1],
			[, , 1, , 1],
			[1, 1, 1, 1, 1],
			[, , 1, , ]
		],
		t: [
			[1, 1, 1],
			[, 1],
			[, 1],
			[, 1],
			[, 1]
		],
		u: [
			[1, , 1],
			[1, , 1],
			[1, , 1],
			[1, , 1],
			[1, 1, 1]
		],
		v: [
			[1, , 1],
			[1, , 1],
			[1, , 1],
			[1, , 1],
			[, 1]
		],
		w: [
			[1, , , , 1],
			[1, , , , 1],
			[1, , 1, , 1],
			[1, , 1, , 1],
			[, 1, , 1]
		],
		x: [
			[1, , 1],
			[1, , 1],
			[, 1],
			[1, , 1],
			[1, , 1]
		],
		y: [
			[1, , 1],
			[1, , 1],
			[1, 1, 1],
			[, 1],
			[, 1]
		],
		"'": [
			[1]
		],
		".": [
			[0],
			[0],
			[0],
			[0],
			[1]
		],
		" ": [
			[, 0],
			[, ],
			[, ],
			[, ],
			[, ]
		],
		"-": [
			[, 0],
			[, ],
			[1, 1],
			[, ],
			[, ]
		],
		":": [
			[0],
			[1],
			[],
			[1],
			[]
		],
		"?": [
			[1, 1, 1],
			[, , 1],
			[, 1, 1],
			[, , ],
			[, 1]
		],
		"!": [
			[, 1],
			[, 1],
			[, 1],
			[, , ],
			[, 1]
		],
		1: [
			[1, 1, 0],
			[, 1],
			[, 1],
			[, 1],
			[1, 1, 1]
		],
		2: [
			[1, 1, 1],
			[, , 1],
			[1, 1, 1],
			[1, , ],
			[1, 1, 1]
		],
		3: [
			[1, 1, 1],
			[, , 1],
			[, 1, 1],
			[, , 1],
			[1, 1, 1]
		],
		4: [
			[1, , 0],
			[1, , ],
			[1, , 1],
			[1, 1, 1],
			[, , 1]
		],
		5: [
			[1, 1, 1],
			[1, , ],
			[1, 1],
			[, , 1],
			[1, 1]
		],
		6: [
			[1, 1, 1],
			[1, , ],
			[1, 1, 1],
			[1, , 1],
			[1, 1, 1]
		],
		7: [
			[1, 1, 1],
			[, , 1],
			[, 1],
			[, 1],
			[, 1]
		],
		8: [
			[1, 1, 1],
			[1, , 1],
			[1, 1, 1],
			[1, , 1],
			[1, 1, 1]
		],
		9: [
			[1, 1, 1],
			[1, , 1],
			[1, 1, 1],
			[, , 1],
			[1, 1, 1]
		],
		0: [
			[1, 1, 1],
			[1, , 1],
			[1, , 1],
			[1, , 1],
			[1, 1, 1]
		]
	},
	Font = {},
	createFont = function(t) {
		Font[t] = {};
		for (var i in defs) {
			var e = defs[i];
			Font[t][i] = cache(10 * e[0].length + 10, 10 * e.length, function(i, s) {
				s.fs(t);
				for (var h = 0; h < e.length; h++)
					for (var r = 0; r < e[h].length; r++) e[h][r] && s.fr(10 * r, 10 * h, 10, 10)
			})
		}
	};
createFont("white"), createFont("black");
var drawText = function(t, i, e, s, h, r, n) {
		r = r || 1, n && drawText(t, i, "black", s, h + 5, r, !1), t.sv(), t.tr(s, h), t.sc(r, r), s = 0;
		for (var a = 0; a < i.length; a++) {
			var o = i.charAt(a),
				l = Font[e][o];
			l && (t.di(l, s, 0), s += l.width)
		}
		t.rs()
	},
	textWidth = function(t, i) {
		for (var e = 0, s = t.length; s--;) {
			var h = Font.white[t.charAt(s)];
			e += h ? h.width : 0
		}
		return e * (i || 1)
	},
	s = 4,
	car = {
		white: newCar("#fff"),
		broken: newCar("#1b1b1b", !0),
		yellow: newCar("#ff0"),
		blue: newCar("#00f"),
		red: newCar("#f00"),
		green: newCar("#0f0"),
		purple: newCar("#f0f"),
		gray: newCar("#6c6c6c")
	},
	client = function(t) {
		return cache(20, 30, function(i, e) {
			e.fs(t);
			e.fr((i.width - 14) / 2, (i.height - 18) / 2, 14, 18), e.bp(), e.arc(i.width / 2, i.height / 2 - 10, 4, 0, 2 * M.PI, !0), e.arc(i.width / 2, i.height / 2 + 10, 4, 0, 2 * M.PI, !0), e.fill(), e.fs("#e99a79"), e.bp(), e.arc(i.width / 2, i.height / 2, 6, 0, 2 * M.PI, !0), e.fill(), e.fs("#000"), e.fr(i.width / 2 + 2, i.height / 2 - 3, 2, 2), e.fr(i.width / 2 + 2, i.height / 2 + 3, 2, -2)
		})
	},
	clientRed = client("#900"),
	clientBlack = client("#000"),
	clientBlue = client("#00f"),
	clientYellow = client("#880"),
	arrow = cache(40, 40, function(c, r) {
		with(r) tr(c.width / 2, c.height / 2), rotate(Math.PI / 2), tr(-c.width / 2, -c.height / 2), tr(0, c.height), sc(1, -1), fs("#fff"), bp(), mt(20, 40), lt(40, 20), lt(30, 20), lt(30, 0), lt(10, 0), lt(10, 20), lt(0, 20), fill()
	}),
	brokenCar = cache(50, 22, function(c, r) {
		with(r) fs("#1b1b1b"), fr(0, 0, 50, 22), fs("#000"), fr(10, 3, 5, 16), fr(30, 3, 10, 16), fr(15, 1, 7, 1), fr(23, 1, 7, 1), fr(15, 20, 7, 1), fr(23, 20, 7, 1)
	}),
	grass = cache(200, 200, function(t, i) {
		for (var e = 0; e < t.width; e += 4)
			for (var s = 0; s < t.height; s += 4) i.fs("rgb(0," + (128 + ~~rd(-50, 50)) + ", 0)"), i.fr(e, s, 4, 4)
	}, "pattern"),
	sidewalk = cache(100, 100, function(t, i) {
		for (var e = 0; e < t.width; e += s)
			for (var h = 0; h < t.height; h += s) {
				var r = (e < 8 || h < 8 || e >= t.width - 8 || h >= t.height - 8 || e >= t.width / 2 - 8 && e <= t.width / 2 + 8 || h >= t.height / 2 - 8 && h <= t.height / 2 + 8 ? 80 : 100) + ~~rd(-10, 10);
				i.fs("rgb(" + r + ", " + r + ", " + r + ")"), i.fr(e, h, s, s)
			}
	}, "pattern"),
	road = cache(200, 200, function(t, i) {
		for (var e = 0; e < t.width; e += s)
			for (var h = 0; h < t.height; h += s) {
				var r = 40 + ~~rd(-10, 10);
				i.fs("rgb(" + r + ", " + r + ", " + r + ")"), i.fr(e, h, s, s)
			}
	}, "pattern"),
	water = cache(100, 100, function(t, i) {
		for (var e = 0; e < t.width; e += s)
			for (var h = 0; h < t.height; h += s) i.fs("rgb(0, " + ~~(168 + ~~rd(-10, 10)) + ", 255)"), i.fr(e, h, s, s)
	}, "pattern"),
	xwalkh = cache(25, 50, function(t, i) {
		for (var e = ~~(t.width / 4); e < .75 * t.width; e += s)
			for (var h = 0; h < t.height; h += s) {
				var r = 255 - ~~rd(10, 50);
				i.fs("rgb(" + r + ", " + r + ", " + r + ")"), i.fr(e, h, s, s)
			}
	}, "pattern"),
	xwalkv = cache(50, 25, function(t, i) {
		for (var e = 0; e < t.width; e += s)
			for (var h = ~~(t.height / 4); h < .75 * t.height; h += s) {
				var r = 255 - ~~rd(10, 50);
				i.fs("rgb(" + r + ", " + r + ", " + r + ")"), i.fr(e, h, s, s)
			}
	}, "pattern");
roof = cache(100, 100, function(t, i) {
	for (var e = 0; e < t.width; e += s)
		for (var h = 0; h < t.height; h += s) {
			var r = 100 + ~~rd(-10, 10);
			i.fs("rgb(" + r + ", " + r + ", " + r + ")"), i.fr(e, h, s, s)
		}
}, "pattern"), roofb = cache(100, 100, function(t, i) {
	for (var e = 0; e < t.width; e += s)
		for (var h = 0; h < t.height; h += s) {
			var r = 50 + ~~rd(-10, 10);
			i.fs("rgb(" + r + ", " + r + ", " + r + ")"), i.fr(e, h, s, s)
		}
}, "pattern"), side1 = cache(100, 100, function(t, i) {
	for (var e = 0; e < t.width; e += s)
		for (var h = 0; h < t.height; h += s) {
			var r = 128 + ~~rd(-5, 5);
			i.fs("rgb(" + r + ", " + r + ", " + r + ")"), i.fr(e, h, s, s)
		}
}, "pattern"), side2 = cache(100, 100, function(t, i) {
	for (var e = 0; e < t.width; e += s)
		for (var h = 0; h < t.height; h += s) {
			var r = 153 + ~~rd(-5, 5);
			i.fs("rgb(" + r + ", " + r + ", " + r + ")"), i.fr(e, h, s, s)
		}
}, "pattern"), hline = cache(100, 4, function(t, i) {
	for (var e = .25 * t.width; e < .75 * t.width; e += s)
		for (var h = 0; h < t.height; h += s) {
			var r = 255 - ~~rd(10, 50);
			i.fs("rgb(" + r + ", " + r + ", " + r + ")"), i.fr(e, h, s, s)
		}
}, "pattern"), vline = cache(4, 100, function(t, i) {
	for (var e = .25 * t.height; e < .75 * t.height; e += s)
		for (var h = 0; h < t.height; h += s) {
			var r = 255 - ~~rd(10, 50);
			i.fs("rgb(" + r + ", " + r + ", " + r + ")"), i.fr(h, e, s, s)
		}
}, "pattern"), tree = cache(200, 200, function(t, i) {
	for (var e = 0; e < t.width; e += s)
		for (var h = 0; h < t.height; h += s)
			if (dist(t.width / 2, t.height / 2, e, h) < .4 * t.width && Math.random() < .8) {
				var r = 50 + ~~rd(-25, 25);
				i.fs("rgb(0, " + r + ", 0)"), i.fr(e, h, s, s)
			}
}), tree2 = cache(150, 150, function(t, i) {
	for (var e = 0; e < t.width; e += s)
		for (var h = 0; h < t.height; h += s)
			if (dist(t.width / 2, t.height / 2, e, h) < .4 * t.width && Math.random() < .8) {
				var r = 50 + ~~rd(-25, 25);
				i.fs("rgb(0, " + r + ", 0)"), i.fr(e, h, s, s)
			}
}), parking = cache(100, 300, function(t, i) {
	i.fs(road), i.fillRect(0, 0, t.width, t.height);
	for (var e = 0; e < t.width; e += s)
		for (var h = 0; h < t.height; h += s)
			if (h < s || h >= t.height - s || (e < s || e >= t.width - s || e >= t.width / 2 - s && e <= t.width / 2 + s) && (h < .3 * t.height || h >= .7 * t.height)) {
				var r = 255 - ~~rd(10, 50);
				i.fs("rgb(" + r + ", " + r + ", " + r + ")"), i.fr(e, h, s, s)
			}
}, "pattern"), addEventListener("load", function() {
	G = new Game
});
var tweens = [],
	Easing = {
		tween: function(t, i, e, s, h, r, n, a) {
			tweens.push({
				o: t,
				p: i,
				a: e,
				b: s,
				d: h,
				l: r || 0,
				f: n || linear,
				e: a || noop,
				t: 0
			})
		},
		cycle: function(t) {
			for (var i, e = tweens.length - 1; e >= 0; e--)(i = tweens[e]).l > 0 ? (i.l -= t, i.o[i.p] = i.a) : (i.t = M.min(i.d, i.t + t), i.o[i.p] = i.f(i.t, i.a, i.b - i.a, i.d), i.t == i.d && (i.e.call(i.o), tweens.splice(e, 1)))
		}
	};
Particle.prototype = {
	render: function(t) {
		alpha(this.a), fs(this.c), fr(this.x - this.s / 2, this.y - this.s / 2, this.s, this.s), alpha(1)
	},
	remove: function() {
		wld.removeParticle(this)
	}
}, Tree.prototype = xt(Building.prototype, {
	render: function() {
		if (!(this.x > wld.camX + P.w + 200 || this.y > wld.camY + P.h + 200 || this.x < wld.camX - 200 || this.y < wld.camY - 200)) {
			var t = this.pointUpperPosition(this.x, this.y, .2),
				i = this.pointUpperPosition(this.x, this.y, .4);
			c.strokeStyle = "#000", c.lineWidth = 15, bp(), mt(this.x, this.y), lt(i.x, i.y), stroke(), di(tree, t.x - tree.width / 2, t.y - tree.height / 2), di(tree2, i.x - tree2.width / 2, i.y - tree2.height / 2)
		}
	},
	contains: function(t, i) {
		return abs(t - this.x) < 15 && abs(i - this.y) < 15
	},
	getCycle: function() {
		return null
	},
	getCorners: function(t) {
		return []
	}
});
