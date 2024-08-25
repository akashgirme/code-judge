export const cppScript = `
#!/bin/bash

CODE_FILE="main.cpp"
STDIN_FILE="stdin.txt"
STDOUT_FILE="stdout.txt"
STDERR_FILE="stderr.txt"
METADATA_FILE="metadata.txt"
EXECUTABLE="a.out"

echo "Compiling \${CODE_FILE}..."
g++ "\${CODE_FILE}" -o "\${EXECUTABLE}" 2> "\${STDERR_FILE}"

# Check if compilation was successful
if [ $? -ne 0 ]; then
  echo "status=compilation-error" > "\${METADATA_FILE}"
  exit 0
fi

# Execute the compiled program
echo "Executing \${EXECUTABLE}..."
./"\${EXECUTABLE}" < "\${STDIN_FILE}" > "\${STDOUT_FILE}" 2>> "\${STDERR_FILE}"

# Check if execution was successful
if [ $? -ne 0 ]; then
  echo "status=execution-error" > "\${METADATA_FILE}"
  exit 0
fi

echo "Compilation and execution completed successfully."
echo "status=successful" > "\${METADATA_FILE}"

# Clean up
rm -f "\${EXECUTABLE}"
`;

export const cScript = `
#!/bin/bash

CODE_FILE="main.c"
STDIN_FILE="stdin.txt"
STDOUT_FILE="stdout.txt"
STDERR_FILE="stderr.txt"
METADATA_FILE="metadata.txt"
EXECUTABLE="a.out"

echo "Compiling \${CODE_FILE}..."
gcc "\${CODE_FILE}" -o "\${EXECUTABLE}" 2> "\${STDERR_FILE}"

# Check if compilation was successful
if [ $? -ne 0 ]; then
  echo "status=compilation-error" > "\${METADATA_FILE}"
  exit 0
fi

# Execute the compiled program
echo "Executing \${EXECUTABLE}..."
./"\${EXECUTABLE}" < "\${STDIN_FILE}" > "\${STDOUT_FILE}" 2>> "\${STDERR_FILE}"

# Check if execution was successful
if [ $? -ne 0 ]; then
  echo "status=execution-error" > "\${METADATA_FILE}"
  exit 0
fi

echo "Compilation and execution completed successfully."
echo "status=successful" > "\${METADATA_FILE}"

# Clean up
rm -f "\${EXECUTABLE}"
`;

export const javaLanguageScript = `
#!/bin/bash

CODE_FILE="Main.java"
STDIN_FILE="stdin.txt"
STDOUT_FILE="stdout.txt"
STDERR_FILE="stderr.txt"
METADATA_FILE="metadata.txt"

echo "Compiling \${CODE_FILE}..."
javac "\${CODE_FILE}" 2> "\${STDERR_FILE}"

# Check if compilation was successful
if [ $? -ne 0 ]; then
  echo "status=compilation-error" > "\${METADATA_FILE}"
  exit 0
fi

# Execute the compiled program
echo "Executing Java program..."
java Main < "\${STDIN_FILE}" > "\${STDOUT_FILE}" 2>> "\${STDERR_FILE}"

# Check if execution was successful
if [ $? -ne 0 ]; then
  echo "status=execution-error" > "\${METADATA_FILE}"
  exit 0
fi

echo "Compilation and execution completed successfully."
echo "status=successful" > "\${METADATA_FILE}"

# Clean up
rm -f Main.class
`;

export const goScript = `
#!/bin/bash

CODE_FILE="main.go"
STDIN_FILE="stdin.txt"
STDOUT_FILE="stdout.txt"
STDERR_FILE="stderr.txt"
METADATA_FILE="metadata.txt"
EXECUTABLE="main"

echo "Compiling \${CODE_FILE}..."
go build -o "\${EXECUTABLE}" "\${CODE_FILE}" 2> "\${STDERR_FILE}"

# Check if compilation was successful
if [ $? -ne 0 ]; then
  echo "status=compilation-error" > "\${METADATA_FILE}"
  exit 0
fi

# Execute the compiled program
echo "Executing \${EXECUTABLE}..."
./"\${EXECUTABLE}" < "\${STDIN_FILE}" > "\${STDOUT_FILE}" 2>> "\${STDERR_FILE}"

# Check if execution was successful
if [ $? -ne 0 ]; then
  echo "status=execution-error" > "\${METADATA_FILE}"
  exit 0
fi

echo "Compilation and execution completed successfully."
echo "status=successful" > "\${METADATA_FILE}"

# Clean up
rm -f "\${EXECUTABLE}"
`;

export const javascriptScript = `
#!/bin/bash

CODE_FILE="main.js"
STDIN_FILE="stdin.txt"
STDOUT_FILE="stdout.txt"
STDERR_FILE="stderr.txt"
METADATA_FILE="metadata.txt"

echo "Executing \${CODE_FILE}..."
node "\${CODE_FILE}" < "\${STDIN_FILE}" > "\${STDOUT_FILE}" 2> "\${STDERR_FILE}"

# Check if execution was successful
if [ $? -ne 0 ]; then
  echo "status=execution-error" > "\${METADATA_FILE}"
  exit 0
fi

echo "Compilation and execution completed successfully."
echo "status=successful" > "\${METADATA_FILE}"
`;