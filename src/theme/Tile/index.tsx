import Items from '@/components/Items'
import { bookMarkStore, itemShowThemeStore } from '@/store'
import { useAtom } from 'jotai'
import 'swiper/css'

function Tile() {
	// const [currentData, setCurrentData] = useState<BM.Item[]>([])
	const [currentData, setCurrentData] = useAtom(bookMarkStore)
	// useEffect(() => setCurrentData(FullData), [])
	const [showData] = useAtom(itemShowThemeStore)
	return (
		<main
			className='grid-rows-auto beautyScroll grid flex-1 gap-20 overflow-y-auto p-20'
			style={{
				gridTemplateColumns: 'repeat(auto-fill, minmax(' + showData.width + 'px, 1fr))',
				gridAutoRows: showData.width + 'px'
			}}
		>
			<Items data={currentData} callback={null} />
		</main>
	)
}
export default Tile
