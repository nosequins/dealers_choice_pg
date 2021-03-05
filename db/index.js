const pg = require('pg');
// process.env.DATABASE_URL ||
const client= new pg.Client('postgres://localhost/stata');
const syncAndSeed= async()=>{
    const SQL=(`
    DROP TABLE IF EXISTS "Commands";
    CREATE TABLE "Commands"(
        id SERIAL PRIMARY KEY,
        command VARCHAR(100) NOT NULL,
        description TEXT NOT NULL,
        example TEXT NOT NULL,
        link TEXT NOT NULL
    );
INSERT INTO "Commands"(id, command, description, example, link) VALUES(1, 'clear', 'By itself, removes data and value labels from memory and is equivalent to typing', 'sysuse auto, clear <- after importing the dataset,
 you would want to clear the memory of previous datasets', 'https://www.stata.com/manuals/dclear.pdf'  );
INSERT INTO "Commands"(id, command, description, example, link) VALUES(2, 'capture', 'Executes command, suppressing all its output (including error messages, if any) and issuing a return code of zero.',
'capture log close <- this will garuntee to close any logs in the beginning of your file, incase the last time the program ran
there was an error.', 'https://www.stata.com/manuals/pcapture.pdf');
INSERT INTO "Commands"(id, command, description, example, link) VALUES(3, 'log', 'log and its subcommands tell Stata to open
 a log file and create a record of what you type and any output that appears in the Results window,
 to suspend or resume logging, to check logging status, and to close the log file', 'log using mylog1 <- this will output a log file of your session with the
 title mylog1, the extension will be .smcl, but you can override the extension by putting the extension you will want like .log', 'https://www.stata.com/manuals/rlog.pdf');
INSERT INTO "Commands"(id, command, description, example, link) VALUES(4, 'macro', 'They are by definition what you would calla variable in every other programming language.
They hold information by a certain name given or created by the user.', 'local b1 *newvar*
local a *b*
local i = 1 <- all of these examples are ways to write a local macro. To call a local macro have to use x, inplace of is the local name.', 'https://www.stata.com/manuals/pmacro.pdf');
INSERT INTO "Commands"(id, command, description, example, link) VALUES(5, 'generate', 'Creates a new variable. As in creates a new variable for the dataset, not to be confused with a macro. They will create a new column (variable) with whatever value is set to the variable. Can use functions or specific values','generate newv2 = my text <- new column will have a name of newv2 and all the rows in that column will be filled with my text','https://www.stata.com/manuals/dgenerate.pdf' );
INSERT INTO "Commands"(id, command, description, example, link) VALUES(6, 'egen', 'Creates newvar of the optionally specified storage type equal to fcn(arguments). These are helpful for functions that you want to do by specific groups whereas generate does not have that capability','egen newv3 = total(v1), by(catvar) <- creates a new variable new3 that takes the total of v1 by the cetgorical level of catvar', 'https://www.stata.com/manuals/degen.pdf');
INSERT INTO "Commands"(id, command, description, example, link) VALUES(7, 'foreach', 'Repeatedly sets local macro lname to each element of the list and executes the commands enclosed in braces.', 'repeatedly sets local macro lname to each element of the list and executes the commands enclosed in braces. <- displays each entry in the local macro','https://www.stata.com/manuals/pforeach.pdf');
INSERT INTO "Commands"(id, command, description, example, link) VALUES(8, 'tabulate', 'Produces a one-way table of frequency counts. tab1 produces a one-way tabulation for each variable specified in varlist.', 'tabulate v1, sort & tab1 v1 v2 v3 <- tabulate was used for one variable while tab1 was used for many variables', 'https://www.stata.com/manuals/rtabulateoneway.pdf');
INSERT INTO "Commands"(id, command, description, example, link) VALUES(9, 'bysort', 'by and bysort are really the same command; bysort is just by with the sort option. prefix to command, does the commany by level of variable(s) called by by or bysort', 'by catvar: generate newv = _n <- sorts data by catvar level, _n means number of observations at each level', 'https://www.stata.com/manuals/dby.pdf');
INSERT INTO "Commands"(id, command, description, example, link) VALUES(10, 'summarize', 'Calculates and displays a variety of univariate summary statistics.', 'summarize v1-v3 or even by catvar: summarize v1 <- first example
gives the summary of v1 v2 and v3 while the second example gives a summary of v1 by the level catvar', 'https://www.stata.com/manuals14/rsummarize.pdf');
INSERT INTO "Commands"(id, command, description, example, link) VALUES(11, 'rename', 'rename changes the names of existing variables to the new names specified.', 'rename (v1 v2) (var1 var2) <- renames v1 and v2 to var1 and var2', 'https://www.stata.com/manuals/drenamegroup.pdf')
    `)
    await client.query(SQL)
}
 
module.exports= {client, syncAndSeed}
