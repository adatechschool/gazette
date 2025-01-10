import { Flex, Input, useBreakpointValue } from '@chakra-ui/react';
import { Field } from '@/components/ui/field';

const FormLoginCC = () => {
	const isMobile = useBreakpointValue({ base: true, lg: false });
	return (
		<div>
			{isMobile ? (
				<Flex width="100vw" flexDirection="column" gap="8">
					<Field label="Email">
						<Input placeholder="me@example.com" />
					</Field>
					<Field label="Email">
						<Input placeholder="me@example.com" />
					</Field>
				</Flex>
			) : (
				<Flex width="50vw" flexDirection="column" gap="8">
					<Field label="Email">
						<Input placeholder="me@example.com" />
					</Field>
					<Field label="Email">
						<Input placeholder="me@example.com" />
					</Field>
				</Flex>
			)}
		</div>
	);
};

export default FormLoginCC;
