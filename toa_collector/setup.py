from setuptools import setup, find_packages

version = '0.0'

requires = (
    'apscheduler',
    'requests',
    'redis',
    'marshmallow',
    'pyshp',
    'shapely'
)

setup(
    name='toa_collector',
    version=version,
    description="Collector of lighting from TOA service",
    long_description="",
    classifiers=[
        "Programming Language :: Python",
    ],
    author='NextGIS',
    author_email='info@nextgis.ru',
    url='https://github.com/nextgis/nextgisweb_groza',
    keywords='',
    license='',
    packages=find_packages(exclude=['ez_setup']),
    include_package_data=True,
    zip_safe=False,
    install_requires=requires,
    entry_points="""\
      [console_scripts]
      toa_collector_run = toa_collector.start:main
      """
)
