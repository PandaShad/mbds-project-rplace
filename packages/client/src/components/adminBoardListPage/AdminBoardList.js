/* eslint-disable no-underscore-dangle */
import {
	Button,
	Heading,
	Select,
	Spinner, Stack, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr,
} from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { useBoards } from '../../hooks/useBoards';

export default function AdminBoardList() {
	const { boards, loading } = useBoards();
	const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
	const [statusFilter, setStatusFilter] = useState('');
	const [authorFilter, setAuthorFilter] = useState('');

	const authors = useMemo(() => {
		const uniqueAuthors = new Set(boards.map((board) => board.created_by.userName));
		return [...uniqueAuthors];
	}, [boards]);

	function sortBoards(filteredBoards) {
		if (!sortConfig.key) return filteredBoards;
		const sortedBoards = [...filteredBoards].sort((a, b) => {
			if (a[sortConfig.key] < b[sortConfig.key]) {
				return sortConfig.direction === 'ascending' ? -1 : 1;
			}
			if (a[sortConfig.key] > b[sortConfig.key]) {
				return sortConfig.direction === 'ascending' ? 1 : -1;
			}
			return 0;
		});
		return sortedBoards;
	}

	function filterBoards(array) {
		return array.filter((board) => (statusFilter ? board.status === statusFilter : true)
						&& (authorFilter ? board.created_by.userName === authorFilter : true));
	}

	const handleSort = (key) => {
		const direction = sortConfig.key === key && sortConfig.direction === 'ascending' ? 'descending' : 'ascending';
		setSortConfig({ key, direction });
	};

	if (loading) {
		return <Spinner color="teal.500" size="xl" />;
	}

	const filteredAndSortedBoards = sortBoards(filterBoards(boards));

	return (
		<Stack align="center" overflowX="auto" flexWrap="nowrap" spacing="4">
			<Heading as="h1" size="lg" mb="4">
				Admin Board List
			</Heading>

			<Stack direction="row" align="center" spacing="4">
				<Button colorScheme="teal" size="md" onClick={() => handleSort('title')}>
					Sort by Name
				</Button>
				<Button colorScheme="teal" size="md" onClick={() => handleSort('created_by.userName')}>
					Sort by Author
				</Button>
				<Button colorScheme="teal" size="md" onClick={() => handleSort('start_date')}>
					Sort by Creation Date
				</Button>
				<Button colorScheme="teal" size="md" onClick={() => handleSort('end_date')}>
					Sort by End Date
				</Button>
				<Button colorScheme="teal" size="md" onClick={() => handleSort('override')}>
					Sort by Override
				</Button>
				<Button colorScheme="teal" size="md" onClick={() => handleSort('status')}>
					Sort by Status
				</Button>
			</Stack>

			<Stack direction="row" align="center" spacing="4">
				<Select placeholder="Filter by Author" onChange={(e) => setAuthorFilter(e.target.value)}>
					{authors.map((author) => (
						<option key={author} value={author}>{author}</option>
					))}
				</Select>
				<Select placeholder="Filter by Status" onChange={(e) => setStatusFilter(e.target.value)}>
					<option value="ongoing">OnGoing</option>
					<option value="finished">Finished</option>
				</Select>
			</Stack>

			<TableContainer>
				<Table variant="simple">
					<TableCaption>Boards</TableCaption>
					<Thead>
						<Tr>
							<Th>Board Name</Th>
							<Th>Created By</Th>
							<Th>Dimensions</Th>
							<Th>Waiting time</Th>
							<Th>Override</Th>
							<Th>Created At</Th>
							<Th>End Date</Th>
							<Th>Status</Th>
						</Tr>
					</Thead>
					<Tbody>
						{filteredAndSortedBoards.map((board) => (
							<Tr key={board._id}>
								<Td>{board.title}</Td>
								<Td>{board.created_by.userName}</Td>
								<Td>{ `${board.dimension.width}x${board.dimension.height}` }</Td>
								<Td>{ `${board.waiting_time}s `}</Td>
								<Td>{board.override ? 'Yes' : 'No'}</Td>
								<Td>{new Date(board.start_date).toLocaleDateString()}</Td>
								<Td>{new Date(board.end_date).toLocaleDateString()}</Td>
								<Td>{board.status}</Td>
							</Tr>
						))}
					</Tbody>
				</Table>
			</TableContainer>
		</Stack>
	);
}
