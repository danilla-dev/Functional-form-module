export const calculateDistance = (ref, setDistanceState) => {
	if (ref.current) {
		const rect = ref.current.getBoundingClientRect()
		const scrollTop = window.pageYOffset || document.documentElement.scrollTop
		const distance = rect.bottom + scrollTop
		setDistanceState(distance)
	}
}
