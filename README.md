# Purpose of the repository

This project is an attempt to integrate patient management for self-employed psychotherapists into the google workspace. Processes such as creating patients, contacting interested parties, creating invoices, creating appointments etc. should be automated and optimized as much as possible.

## Why google workspace

The google workspace has a ISO27001 certification and can used HIPAA compliant. The idea was using google spreadsheets, google docs etc. for implementing

# Development

The development is done in TypeScript and the code transferd to google apps script. While the transfer the code
is converted in to the .gas (google apps script) format, which is really close to JavaScript with some downsides.
There are some things not working while this conversion, for example static class members assigning needs to get
done with a static function.
