import {Box, Input, Text} from "@chakra-ui/react";
import NDDropzone from "../nd-dropzone/nd-dropzone";
import {ChangeEvent, ChangeEventHandler, FormEvent, useState} from "react";
import {KeyManager} from "@pokt-foundation/pocketjs-signer";


function ImportNcWalletStep() {

    const [passphrase, setPassphrase] = useState('')
    const handlePassphraseInput = (event: ChangeEvent<HTMLInputElement>) => {
        setPassphrase(event.target.value)
    }

    const [filePrompt, setUploadFilePrompt] = useState('Click here or drag and drop your keyfile json.')
    const onKeyFileAdded = (e: File[]) => {
        const keyFile = e[0];
        const reader = new FileReader()
        reader.onabort = () => console.log('file reading was aborted')
        reader.onerror = () => console.log('file reading has failed')
        reader.onload = async () => {
            setUploadFilePrompt(`Selected file: ${keyFile.name}`)
            const ppkString = reader.result as string
            try {
                const importedWallet = await KeyManager.fromPPK({password: passphrase, ppk: ppkString})
                console.log(importedWallet.getAccount())
                console.log(passphrase)
            } catch (e) {
                console.log("Failed to retrieve wallet, likely malformed keyfile or wrong passphrase.")
            }
        }
        reader.readAsText(keyFile);
    }

    return (
        <Box>
            <Text color="White" fontSize="20px" fontWeight="400">
                Import your non custodial wallet keyfile, and enter the decryption passphrase.
            </Text>

            <Box margin="2rem 0">
                <Text color="white" margin="1rem 0">
                    Passphrase
                </Text>
                <Input type="text" onChange={handlePassphraseInput}/>
                <NDDropzone onDrop={onKeyFileAdded} acceptedFileType="json" prompt={filePrompt}/>
            </Box>
        </Box>
    );
}

export default ImportNcWalletStep;
