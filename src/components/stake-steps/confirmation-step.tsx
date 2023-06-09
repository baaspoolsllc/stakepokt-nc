import { TableContainerStyle } from '@/styles/Table'
import { ArrowBackIcon } from '@chakra-ui/icons'
import {
    Button,
    ButtonGroup,
    Flex,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
} from '@chakra-ui/react'
import { StakeForm } from './stake-form'
import { BidirectionalStepProps } from './step-props'

type ConfirmationStepProps = {
    stakeForm: StakeForm
} & BidirectionalStepProps

function ConfirmationStep({
    stakeForm,
    onNextStep,
    onPrevStep,
}: ConfirmationStepProps) {
    const { stakeAmount, transferAmount, customOutputAddress } = stakeForm

    const finishStep = () => {
        onNextStep({
            stakeAmount: stakeAmount,
            transferAmount: transferAmount,
            customOutputAddress: customOutputAddress,
        })
    }

    return (
        <>
            <Text color="white" margin="1rem 0">
                {`Stake Amount Per Node: ${stakeForm.stakeAmount?.getValue()}`}
            </Text>
            <Text color="white" margin="1rem 0">
                {`Nodes to Stake: ${stakeForm.nodesToStake?.length}`}
            </Text>
            <Text color="white" margin="1rem 0">
                {`Additional Transfer Amount Per Node: ${stakeForm.transferAmount?.getValue()}`}
            </Text>
            <Text color="white" margin="1rem 0">
                {`Non Custodial Address: ${
                    stakeForm.customOutputAddress ||
                    stakeForm.wallet?.getAddress()
                }`}
            </Text>

            <TableContainer sx={TableContainerStyle}>
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th>Node Alias</Th>
                            <Th>Node Address</Th>
                        </Tr>
                    </Thead>
                    <Tbody color="white">
                        {stakeForm.nodesToStake?.map((node) => {
                            return (
                                <Tr key={node.node_alias}>
                                    <Td>{node.node_alias}</Td>
                                    <Td>{node.address}</Td>
                                </Tr>
                            )
                        })}
                    </Tbody>
                </Table>
            </TableContainer>

            <Flex width="100%" justify="flex-end">
                <ButtonGroup>
                    <Button
                        border="1px solid white"
                        color="white"
                        leftIcon={<ArrowBackIcon />}
                        marginRight={4}
                        onClick={onPrevStep}
                        size="lg"
                        variant="outline"
                        _hover={{ backgroundColor: 'transparent' }}
                    >
                        Back
                    </Button>
                    <Button
                        backgroundColor="#5C58FF"
                        onClick={finishStep}
                        size="lg"
                        _hover={{ backgroundColor: '#5C58FF' }}
                    >
                        {`Yes, I'm ready to stake`}
                    </Button>
                </ButtonGroup>
            </Flex>
        </>
    )
}

export default ConfirmationStep
