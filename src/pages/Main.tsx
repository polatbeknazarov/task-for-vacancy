import CompanyListTable from '../components/CompanyListTable'
import Header from '../components/Header'

export default function Main() {
	return (
		<main>
			<Header />
			<div className='p-[15px]'>
				<CompanyListTable />
			</div>
		</main>
	)
}
