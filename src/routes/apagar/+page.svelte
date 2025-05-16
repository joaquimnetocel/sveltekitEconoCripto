<script lang="ts">
	let primeiroTimer = $state<ReturnType<typeof setTimeout>>();
	let timerDefinitivo = $state<ReturnType<typeof setInterval>>();

	function funcaoIniciarPrimeiroTimer() {
		primeiroTimer = setTimeout(() => {
			if (!primeiroTimer) return;
			console.log('⏰ Timer de 5 segundos disparado!');
			clearTimeout(primeiroTimer);
			funcaoIniciarTimerRepetitivo();
		}, 5 * 1000);
	}

	function funcaoIniciarTimerRepetitivo() {
		console.log('Iniciando intervalo de 10 em 10 minutos...');
		timerDefinitivo = setInterval(() => {
			console.log('⏰ Disparou intervalo de 10 minutos!');
		}, 10 * 1000);
	}

	$effect(() => {
		funcaoIniciarPrimeiroTimer();
		return () => {
			if (primeiroTimer) {
				clearTimeout(primeiroTimer);
			}
			if (timerDefinitivo) {
				clearInterval(timerDefinitivo);
			}
		};
	});
</script>
