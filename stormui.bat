echo off
rem ----------------------------------------------------------------------------
rem This script is only for development use
rem Both react-storm-ui and storm-ui-test folders must reside in the same 
rem directory
rem ----------------------------------------------------------------------------

cd ../

rem Clean up previous build
IF EXIST react-storm-ui\dist (
	rmdir /s /q react-storm-ui\dist
	echo # cleaned react-storm-ui previous build
)

IF EXIST storm-ui-test\dist (
	rmdir /s /q storm-ui-test\dist
	echo # cleaned storm-ui-test previous build
)

rem build storm ui react library
cd react-storm-ui
call npm run build && (
	echo # storm-ui react library build completed
	cd ../
	cd storm-ui-test
	call npm run compile && (
		cls
		echo # storm-ui  test program is ready.
	) || (
		echo # storm-ui  test program compile Error
	)
) || (
	echo # storm-ui  react library build Error
	cd ../
	cd storm-ui-test	
)


