from setuptools import setup, find_packages

VERSION = '0.0.1'
DESCRIPTION = 'Client wrapper around the hubspot api'
LONG_DESCRIPTION = 'A library that encapsulates the hubspot api in an easy to use client'

setup(
        name="hs",
        version=VERSION,
        author="",
        author_email="",
        description=DESCRIPTION,
        long_description=LONG_DESCRIPTION,
        packages=find_packages(),
        install_requires=['requests'],
        keywords=['python', 'hubspot'],
        classifiers= [
            "Development Status :: 3 - Alpha",
            "Intended Audience :: Education",
            "Programming Language :: Python :: 2",
            "Programming Language :: Python :: 3",
            "Operating System :: MacOS :: MacOS X",
            "Operating System :: Microsoft :: Windows",
        ]
)
