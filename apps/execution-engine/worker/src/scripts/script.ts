import { LanguageScript } from '../types';

/**

> extension: A string representing the file extension for the language (e.g., "cpp" for C++, "py" for Python).
> script: A string containing the bash script that will compile (if necessary) and run the code for that language.

--------------------------------------------------------------------------------------------------------------------------------------------------
> The Common Script:

  The commonScript is a bash script that defines several functions used by all language-specific scripts. Here's what each part does:
    CODE_FILE="\${1}"
    STDIN_FILE="stdin.txt"
    STDOUT_FILE="stdout.txt"
    STDERR_FILE="stderr.txt"
    METADATA_FILE="metadata.txt"
    EXIT_CODE_FILE="exit_code.txt"
  These lines define variables for various file names used in the script.
  
  compile() {
    echo "Compiling \${CODE_FILE}..."
    \${2} 2> "\${STDERR_FILE}"
    echo $? > "\${EXIT_CODE_FILE}"
  }
  This function compiles the code (if necessary). It takes the compilation command as an argument and redirects errors to STDERR_FILE.
  It then saves the exit code to EXIT_CODE_FILE.

  execute() {
    echo "Executing \${3}..."
    \${4} < "\${STDIN_FILE}" > "\${STDOUT_FILE}" 2>> "\${STDERR_FILE}"
    echo $? > "\${EXIT_CODE_FILE}"
  }
  This function executes the compiled code (or interprets the script).
  It takes the execution command as an argument, uses STDIN_FILE for input, redirects output to STDOUT_FILE, and appends errors to STDERR_FILE.
  
  cleanup() {
    rm -f \${5}
  }
  This function removes any temporary files created during compilation.

  run() {
    if [ -n "\${2}" ]; then
        compile "\${@}"
        if [ \$(cat "\${EXIT_CODE_FILE}") -ne 0 ]; then
            echo "status=compilation-error" > "\${METADATA_FILE}"
            exit 0
        fi
    fi

    execute "\${@}"
    if [ \$(cat "\${EXIT_CODE_FILE}") -ne 0 ]; then
        echo "status=execution-error" > "\${METADATA_FILE}"
        exit 0
    fi

    echo "status=successful" > "\${METADATA_FILE}"
    cleanup "\${@}"
  }
  This function orchestrates the whole process. It compiles the code (if a compilation command is provided),
  executes it, and performs cleanup. It also handles errors and writes the status to METADATA_FILE.

--------------------------------------------------------------------------------------------------------------------------------------------------
> Language-Specific Scripts:

  Each language-specific script uses the common script and provides language-specific details. Let's look at the C++ script as an example:
  export const cppScript: LanguageScript = {
    extension: 'cpp',
    script: `${commonScript}
    EXECUTABLE="a.out"
    run "\${CODE_FILE}" "g++ \${CODE_FILE} -o \${EXECUTABLE}" "\${EXECUTABLE}" "./\${EXECUTABLE}" "\${EXECUTABLE}"
    `
    };

  This script:
    -Sets the file extension to 'cpp'.
    -Includes the commonScript.
    -Defines the name of the executable.
    -Calls the run function with arguments specific to C++:
      -The name of the code file
      -The compilation command
      -The name of the executable (for logging)
      -The command to run the executable
      -The name of the file to clean up
--------------------------------------------------------------------------------------------------------------------------------------------------
> How the Execution Works:

  When you want to execute code:

  The appropriate script is selected based on the file extension.
  The script is written to a file in the job directory.
  The user's code is written to a file (e.g., main.cpp for C++).
  The script is executed, passing the name of the code file as an argument.
  The script then:

  Compiles the code (for compiled languages)
  Runs the code
  Captures stdout and stderr
  Records the exit status
  Cleans up temporary files
 
 
 */

const commonScript = `
set -e

CODE_FILE="\${1}"
STDIN_FILE="stdin.txt"
STDOUT_FILE="stdout.txt"
STDERR_FILE="stderr.txt"
METADATA_FILE="metadata.txt"
EXIT_CODE_FILE="exit_code.txt"

compile() {
    echo "Compiling \${CODE_FILE}..."
    \${2} 2> "\${STDERR_FILE}"
    echo $? > "\${EXIT_CODE_FILE}"
}

execute() {
    echo "Executing \${3}..."
    \${4} < "\${STDIN_FILE}" > "\${STDOUT_FILE}" 2>> "\${STDERR_FILE}"
    echo $? > "\${EXIT_CODE_FILE}"
}

cleanup() {
    rm -f \${5}
}

run() {
    if [ -n "\${2}" ]; then
        compile "\${@}"
        if [ \$(cat "\${EXIT_CODE_FILE}") -ne 0 ]; then
            echo "status=compilation-error" > "\${METADATA_FILE}"
            exit 0
        fi
    fi

    execute "\${@}"
    if [ \$(cat "\${EXIT_CODE_FILE}") -ne 0 ]; then
        echo "status=execution-error" > "\${METADATA_FILE}"
        exit 0
    fi

    echo "status=successful" > "\${METADATA_FILE}"
    cleanup "\${@}"
}
`;

export const cppScript: LanguageScript = {
  extension: 'cpp',
  script: `${commonScript}
EXECUTABLE="a.out"
run "\${CODE_FILE}" "g++ \${CODE_FILE} -o \${EXECUTABLE}" "\${EXECUTABLE}" "./\${EXECUTABLE}" "\${EXECUTABLE}"
`,
};

export const cScript: LanguageScript = {
  extension: 'c',
  script: `${commonScript}
EXECUTABLE="a.out"
run "\${CODE_FILE}" "gcc \${CODE_FILE} -o \${EXECUTABLE}" "\${EXECUTABLE}" "./\${EXECUTABLE}" "\${EXECUTABLE}"
`,
};

export const javaScript: LanguageScript = {
  extension: 'java',
  script: `${commonScript}
run "Main.java" "javac \${CODE_FILE}" "Java program" "java Main" "Main.class"
`,
};

export const goScript: LanguageScript = {
  extension: 'go',
  script: `${commonScript}
EXECUTABLE="main"
run "\${CODE_FILE}" "go build -o \${EXECUTABLE} \${CODE_FILE}" "\${EXECUTABLE}" "./\${EXECUTABLE}" "\${EXECUTABLE}"
`,
};

export const javascriptScript: LanguageScript = {
  extension: 'js',
  script: `${commonScript}
run "\${CODE_FILE}" "" "Node.js script" "node \${CODE_FILE}" ""
`,
};

export const pythonScript: LanguageScript = {
  extension: 'py',
  script: `${commonScript}
run "\${CODE_FILE}" "" "Python script" "python \${CODE_FILE}" ""
`,
};

export const languageScripts: LanguageScript[] = [
  cppScript,
  cScript,
  javaScript,
  goScript,
  javascriptScript,
  pythonScript,
];
